import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setValue, setSaveObjValue } from '../redux/About/changeMsgSlice';
function About() {
    //useNavigate - ensures page is not refreshed and navs to route maintaining REDUX State
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const msgTxt = useSelector(state => state.changeMsg.user);
    const [ obj, setSaveObj ] = useState({
        age: null,
        name: '',
        occpation: '',
        viewType: ''
    })
    const [dropdownValue, setDropdownVal] = useState('Engineer')

    const [radioValue, setRadioValue] = useState('Engineer')
    
    useEffect(()=>{
        console.log('THIS HAS RUN 1>> ',obj)
    },[obj])

    const saveObjfn = async(e, objName) => {
        setSaveObj({
            ...obj,
            [objName]: e.target.value
        })
        if(objName === 'occpation'){
            setDropdownVal(e.target.value)
        }
        if(objName === 'viewType'){
            setRadioValue((e.target.value))
        }
    }
    const saveData = () => {
        // dispatch(setValue(' VINAYAK IYER '))
        dispatch(setSaveObjValue(obj))
    }
    // useEffect(()=>{
    //     // document.title = 'About Page 2'
    //     console.log('THIS HAS RUN 2')
    // })
    console.log('msgTxt>>>>>>>>>>>>>>>>>>>>>> ',msgTxt)
    return (<>
    <h1> This is Testing Page, where we could test out Redux</h1>
    
    <h2>About - ${msgTxt?.name} -- 2ndVal-- ${msgTxt?.age}</h2>
    <input type='text' placeholder='NAME' id='abtChangeTxt' onChange={(e)=> { saveObjfn(e, 'name')}}/>

    <br />

    <input type='text' placeholder='Age' id='age' onChange={(e)=> { saveObjfn(e, 'age') }}/>
    

    <br />
    <div>
    <label htmlFor="dropdown">Choose an option:</label>
    <select id="occpation" value={dropdownValue} onChange={(e)=> saveObjfn(e,'occpation')}>
        <option value="">Select an option</option>
        <option value="Student">Student</option>
        <option value="Solution Architect">Solution Architect</option>
        <option value="Engineer">Engineer</option>
    </select>
    </div>

    <br />

    <div>
        <label>
            <input
                type="radio"
                value="UA"
                checked={radioValue === 'UA'}
                onChange={(e)=> saveObjfn(e,'viewType')}
                name='viewType'
            />
            UA
        </label>
        <label>
            <input
                type="radio"
                value="AA"
                checked={radioValue === 'AA'}
                onChange={(e)=> saveObjfn(e,'viewType')}
                name='viewType'
            />
            AA
        </label>
        <label>
            <input
                type="radio"
                value="VA"
                checked={radioValue === 'VA'}
                onChange={(e)=> saveObjfn(e,'viewType')}
                name='viewType'
            />
            VA
        </label>
    </div>
        <br />
    <button onClick={() => saveData()}>Change Txt</button>
        <br />
        {/* window.history.pushState('', 'Send Notice', `/v1/society/page/send-notice?id=${id}`) */}
        <Link to="/counter"><button>Go to Counter</button></Link>
    
        <br />
        <button onClick={e => navigate('/dashboard')}>Go to Dashboard</button>
    
    </>)

    
}

export default About;
