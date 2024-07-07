import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setValue } from '../../redux/scraperMain/scraperSlice'
import axiosInstance from '../../api/axios';
import { apiEndpoints } from '../../api/endpoints'

import LaddaButton, {EXPAND_LEFT} from 'react-ladda-button'
import 'react-ladda-button/dist/ladda-themeless.min.css'
import './FormContents.scss';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const FormContents = () => {
  const dispatch = useDispatch()
  const scraperApiData = useSelector(state=> state.scraperApiData?.data)
  // console.log('scraperApiData-->> ',scraperApiData)
  const { metaDescription = '', metaKeywords = '', pageTitle = '', productImage = '', productTitle = '', cache = false, responseTime = '' } = scraperApiData || {}

  const [formData, setFormData] = useState({
    url: ''
  });
  const [btnLoading, setLoading] = useState(false)
  const [metaInfo,  setMetaInfo] = useState(null)

  // ... (Form handling logic to update formData)
  const submitFormData = async(e) => {
    e.preventDefault()
    setLoading(true)
      try {
        const response = await axiosInstance.post(apiEndpoints.scraperApi, formData)
        const responsData = response?.data?.data || {}
        dispatch(setValue({
          data: {
            ...responsData.htmlData,
            cache: !!responsData?.cache,
            responseTime: response.headers.responseTime
          }
        })) 
        // return true
        // alert(JSON.stringify(response.data))
      } catch(error) {
        console.log('AXIOS ERR>> ',error)
        const { status: errStatusCode, data: { errors: valErrArr = []} = {} } = error.response || {}
        if(errStatusCode === 422){

          Swal.fire({
            title: 'Error!',
            text: `${valErrArr.length >=1 ? valErrArr[0]?.message: 'Invalid Url Value!' }`,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
        //set empty values
        dispatch(setValue({
          data: {
            metaDescription: '', metaKeywords: '', pageTitle: '', productImage: '', productTitle: '', cache: false
          }
        }))
      }
      setLoading(false)
  }
  /**
   * @scraperApiData - this will tell the component that a change was detected in scraperApiData(the dispatch data) so the data will be re-rendered
   */
  useEffect(()=>{
    if(scraperApiData.pageTitle){
      setMetaInfo(<> 
        <p>Description - {metaDescription}</p>
        <p>Title - {pageTitle}</p>
        <p>Keywords - {metaKeywords}</p>
        {productTitle ? <p>Product Title - {productTitle}</p>: ''}
        {productImage ? <p><a href={productImage} target="_blank" rel="noopener noreferrer">
                          <img src={productImage} alt={productTitle || 'alt-image'} />
                           </a>
                          </p>: ''}
        <p>Data Fetched in {Number(responseTime)/1000} seconds</p>
        {cache ? <p>Data has been fetched from DB-Cache!</p>: ''}
        </>
      )
    }else{
      setMetaInfo('')
    }
},[scraperApiData])

  return (
    <div className="registration-form">
      <h2>Metadata Scapper</h2>
      <form onSubmit={submitFormData}>
        <div className="form-group">
          <label htmlFor="websiteName">Website Url:</label>
          <input 
            type="text" 
            id="websiteName" 
            value={formData.url} 
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            required
          />
        </div>
        <LaddaButton type="submit" 
        data-style={EXPAND_LEFT} 
        loading={btnLoading}
        >Fetch Meta-Data</LaddaButton>
      </form>
      {/* {scraperApiData ? JSON.stringify(scraperApiData) : ''} */}
      {!!metaInfo ?  <div className='meta-data'>
      <h4>Meta-tags</h4>
      {metaInfo}
      <p></p>
      </div>: ''}

    </div>
  );
}

export default FormContents;