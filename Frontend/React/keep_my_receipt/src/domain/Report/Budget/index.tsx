import { useEffect, useState } from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import sample from './sample.json';
import ReportIndex from './form/index';

interface ReportType {
  lcName: string;
  list: ItemType[];
  total: number;
}

interface ItemType {
  scName: string;
  balance: number;
}

export default function BudgetReport() {
  const [budgetList, setBudgetList]: [ReportType[], Function] = useState([
    {
      lcName: 'test',
      list: [{ scName: 'test', balance: 0 }],
      total: 0,
    },
  ]);
  const [expenseList, setExpenseList]: [ReportType[], Function] = useState([
    {
      lcName: 'test',
      list: [{ scName: 'test', balance: 0 }],
      total: 0,
    },
  ]);
  const [revenueList, setRevenueList]: [ReportType[], Function] = useState([
    {
      lcName: 'test',
      list: [{ scName: 'test', balance: 0 }],
      total: 0,
    },
  ]);
  const [sumBudget, setSumBudget] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);
  const [sumRevenue, setSumRevenue] = useState(0);

  const date = new Date();
  const year = String(date.getFullYear());
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const curStart = year.concat('-').concat(month).concat('-').concat('01');
  const curEnd = year.concat('-').concat(month).concat('-').concat(day);
  const [startDate, setStartDate] = useState(curStart);
  const [endDate, setEndDate] = useState(curEnd);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    loadData();
    setOpen(false);
  };
  function loadData() {
    // Todo API connect
    sample.forEach((mainCat) => {
      if (mainCat.type === '예산') {
        const tmpList = [...mainCat.list];
        let tmp = 0;
        tmpList.forEach((lcName) => {
          let tmp2 = 0;
          lcName.list.forEach((rcName) => {
            tmp += rcName.balance;
            tmp2 += rcName.balance;
          });
          lcName['total'] = tmp2;
        });
        setSumBudget(tmp);
        setBudgetList(tmpList);
        console.log(tmpList);
      } else if (mainCat.type === '지출') {
        const tmpList = [...mainCat.list];
        let tmp = 0;
        tmpList.forEach((lcName) => {
          let tmp2 = 0;
          lcName.list.forEach((rcName) => {
            tmp += rcName.balance;
            tmp2 += rcName.balance;
          });
          lcName['total'] = tmp2;
        });
        setSumExpense(tmp);
        setExpenseList(tmpList);
      } else if (mainCat.type === '수입') {
        const tmpList = [...mainCat.list];
        let tmp = 0;
        tmpList.forEach((lcName) => {
          let tmp2 = 0;
          lcName.list.forEach((rcName) => {
            tmp += rcName.balance;
            tmp2 += rcName.balance;
          });
          lcName['total'] = tmp2;
        });
        setSumRevenue(tmp);
        setRevenueList(tmpList);
      }
    });
  }

  const budgetMainCategories = ['전기예산', '활동지원금', '회비', '후원금'];
  const expenseMainCategories = [
    '복리후생비',
    '여가교통비',
    '소모품비',
    '기타 비용',
  ];
  const revenueMainCategories = ['수입', '기타 수입'];

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {/* 기간 설정 부분 */}
      <Card
        variant="outlined"
        style={{
          padding: 15,
          width: '100%',
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          style={{ width: '100%' }}
        >
          <Grid xs={8} sm={8} md={8} item justifyContent="start">
            <Typography
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {startDate}　~　{endDate}
            </Typography>
          </Grid>
          <Grid xs={4} sm={4} md={4} item justifyContent="end">
            <Button
              variant="contained"
              color="primary"
              style={{ fontWeight: 'bold' }}
              onClick={handleOpen}
            >
              기간설정
            </Button>
          </Grid>
        </Grid>
      </Card>
      <ReportIndex
        title="예산"
        itemList={budgetList}
        catList={budgetMainCategories}
        sumValue={sumBudget}
      />
      <ReportIndex
        title="지출"
        itemList={expenseList}
        catList={expenseMainCategories}
        sumValue={sumExpense}
      />
      <ReportIndex
        title="수입"
        itemList={revenueList}
        catList={revenueMainCategories}
        sumValue={sumRevenue}
      />
      <ReportIndex
        title="합계"
        itemList={[]}
        catList={['차기예산']}
        sumValue={sumBudget + sumExpense + sumRevenue}
      />
    </>
  );
}
