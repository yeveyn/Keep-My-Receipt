package com.ieung.receipt.repository;

import com.ieung.receipt.entity.Club;
import com.ieung.receipt.entity.QClub;
import com.ieung.receipt.util.QueryDslUtil;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class ClubRepoCommonImpl implements ClubRepoCommon {
    private final JPAQueryFactory queryFactory;
    private EntityManager em;

    public ClubRepoCommonImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
        this.em = em;
    }

    @Override
    public Page<Club> findAllByName(String name, Pageable pageable) {
        List<OrderSpecifier> orders = getAllOrderSpecifiers(pageable);

        List<Club> result = queryFactory
                .select(QClub.club)
                .from(QClub.club)
                .where(QClub.club.name.contains(name))
                .orderBy(orders.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(result, pageable, result.size());
    }

    // Pageable 객체의 sort를 list로 변환
    private List<OrderSpecifier> getAllOrderSpecifiers(Pageable pageable) {

        List<OrderSpecifier> ORDERS = new ArrayList<>();

        if (!pageable.getSort().isEmpty()) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "id":
                        OrderSpecifier<?> orderId = QueryDslUtil.getSortedColumn(direction, QClub.club, "id");
                        ORDERS.add(orderId);
                        break;
                    case "name":
                        OrderSpecifier<?> orderName = QueryDslUtil.getSortedColumn(direction, QClub.club, "name");
                        ORDERS.add(orderName);
                        break;
                    case "description":
                        OrderSpecifier<?> orderDescription = QueryDslUtil.getSortedColumn(direction, QClub.club, "description");
                        ORDERS.add(orderDescription);
                        break;
                    default:
                        break;
                }
            }
        }

        return ORDERS;
    }
}