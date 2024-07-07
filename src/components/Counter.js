import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../redux/counterManagement/counterSlice'

const Counter = () => {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    
    // console.log('prevVal> ',this.state)
    return (<>
        <div>
            <h2>Counter</h2>
            <div>
                <button onClick={() => dispatch(decrement())}>-</button>
                <span>{count}</span>
                <button onClick={() => dispatch(increment())}>+</button>
            </div>
        </div>
        </>
    );
}

export default Counter;
