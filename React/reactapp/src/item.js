import React from 'react'
import {connect} from 'react-redux'

class Item extends React.Component{
    render() {
        let data = this.props.itemData;
        return(
            <tr className={(data.selected ? 'active' : '') + (data.like ? ' like' : '')}>
                <td><input type="checkBox" checked={data.selected}
                           onChange={e => {
                               data.selected = !data.selected
                               //this.props.chengeItemData('selected',data.selected,this.props.index)
                               this.props.dispatch({
                                   type: 'changeData',
                                   value: data.selected,
                                   attr: 'selected',
                                   index: this.props.index
                               })
                           }}
                /></td>
                <td>{data.title}</td>
                <td>{data.singer}</td>
                <td><input type="checkbox" checked={data.like}
                           onChange={e => {
                               data.like = !data.like
                               // this.props.chengeItemData('like',data.like,this.props.index)
                               this.props.dispatch({
                                   type: 'changeData',
                                   value: data.like,
                                   attr: 'like',
                                   index: this.props.index
                               })
                           }}
                /></td>
                <td style={{cursor:'pointer'}} onClick={(e)=> {
                    // this.props.deteleItemData(this.props.index)
                    this.props.dispatch({
                        type: 'remove',
                        id: this.props.index
                    })
                }}>x</td>
            </tr>
        )
    }
}
export default connect((states, props) => {
    return states
})(Item)