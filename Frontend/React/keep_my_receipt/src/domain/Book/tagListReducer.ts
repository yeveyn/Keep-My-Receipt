// 리덕스 모듈 만들기
// 참고: https://react.vlpt.us/redux/04-make-modules.html
// 참고: https://react.vlpt.us/using-typescript/05-ts-redux.html

/* 액션 타입 만들기 */
// 이렇게 하면 다른 모듈과 액션 이름이
// 중복되는 것을 방지 할 수 있습니다.
const MODULE_NAME = 'tagList';
const SET_TAG = `${MODULE_NAME}/SET_TAG` as const;
const CREATE_TAG = `${MODULE_NAME}/CREATE_TAG` as const;
const UPDATE_TAG = `${MODULE_NAME}/UPDATE_TAG` as const;
const DELETE_TAG = `${MODULE_NAME}/DELETE_TAG` as const;

type TagGroupNameType = '대분류' | '중분류' | '태그1' | '태그2';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고
// export 키워드를 사용해서 내보내주세요.
export const setTag = (tagGroupName: TagGroupNameType, tagList: string[]) => ({
  type: SET_TAG,
  tagGroupName,
  tagList,
});

export const createTag = (tagGroupName: TagGroupNameType, tagName: string) => ({
  type: CREATE_TAG,
  tagGroupName,
  tagName,
});

export const updateTag = (
  tagGroupName: TagGroupNameType,
  tagNameOriginal: string,
  tagNameChanged: string,
) => ({
  type: UPDATE_TAG,
  tagGroupName,
  tagNameOriginal,
  tagNameChanged,
});

export const deleteTag = (tagGroupName: TagGroupNameType, tagName: string) => ({
  type: DELETE_TAG,
  tagGroupName,
  tagName,
});

type TagListAction =
  | ReturnType<typeof setTag>
  | ReturnType<typeof createTag>
  | ReturnType<typeof updateTag>
  | ReturnType<typeof deleteTag>;

/* 초기 상태 선언 */
type TagListState = {
  대분류: string[];
  중분류: string[];
  태그1: string[];
  태그2: string[];
  error: string;
};

// 리듀서의 초기 상태는 꼭 객체타입일 필요 없습니다.
// 배열이여도 되고, 원시 타입 (숫자, 문자열, 불리언 이여도 상관 없습니다.
export const initialState: TagListState = {
  대분류: [''],
  중분류: [''],
  태그1: [''],
  태그2: [''],
  error: '',
};

/* 리듀서 선언 */
export default function tagListReducer(
  state: TagListState,
  action: TagListAction,
): TagListState {
  switch (action.type) {
    case SET_TAG:
      return {
        ...state,
        [action.tagGroupName]: action.tagList,
      };

    case CREATE_TAG:
      if (state[action.tagGroupName].includes(action.tagName)) {
        return { ...state, error: '이미 있는 태그입니다' };
      }

      return {
        ...state,
        [action.tagGroupName]: state[action.tagGroupName].concat(
          action.tagName,
        ),
      };

    case UPDATE_TAG:
      if (state[action.tagGroupName].includes(action.tagNameChanged)) {
        return { ...state, error: '이미 있는 태그입니다' };
      }

      return {
        ...state,
        [action.tagGroupName]: state[action.tagGroupName].map((tag) =>
          tag === action.tagNameOriginal ? action.tagNameChanged : tag,
        ),
      };

    case DELETE_TAG:
      return {
        ...state,
        [action.tagGroupName]: state[action.tagGroupName].filter(
          (tag) => tag !== action.tagName,
        ),
      };
    default:
      return state;
  }
}
