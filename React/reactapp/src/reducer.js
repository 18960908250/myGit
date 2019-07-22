import { combineReducers } from 'redux'

const defaultData = [{
    id: new Date().getTime(),
    title: '这是第一首',
    singer: 'IZAYA',
    selected: false,
    like: false }]

let data = (data=defaultData, action) => {
    switch (action.type) {
        case 'add':
            return [{
                id: new Date().getTime(),
                title: action.title,
                singer: action.singer,
                selected: false,
                like: false
            }, ...data]
        case 'remove':
            return  data.filter(item => (item.id !== action.id))
        case 'changeData':
            return data.map(item => {
                if(item.id === action.index){
                    item[action.attr] = action.value
                }
                return item
            })
        case 'checkAll':
            return data.map(item => {
                item.selected = !action.isCheckAll
                return item
            })
        case 'removeSelected':
            return data.filter(item => !item.selected)
        case 'chenageLike':
            return data.map(item => {
                if (item.selected) item.like = action.status
                return item
            })
        default:
            // console.log(action)
    }
    return data
}

let reducer = combineReducers({ data })

export default reducer