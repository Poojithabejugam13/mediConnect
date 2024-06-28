import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Page } from 'react-pdf';
import {Document as Doc} from 'react-pdf' 
import pdf from './22071A1211_Poster.pdf'
function Documents() {
  let {state}=useLocation()
    let [currentDoctor,setDoctor]=useState(state)
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [url,setUrl]=useState()
    console.log(currentDoctor.docs);
    function onDocumentLoadSuccess({ numPages }){
        setNumPages(numPages);
      }

      const showPdf = (pdf) => {
        window.open(`http://localhost:4000/uploads/${pdf}`, "_blank", "noreferrer");
        // setPdfFile(`/http://localhost:8000/files/${pdf}`)
    };
    useEffect(()=>{
        setUrl(`http://localhost:4000/uploads/${currentDoctor.docs}`)
    })
  return (
    <div><div>
        <div className="">
            {currentDoctor.FirstName}
        </div>
    <Doc file="http://localhost:4000/uploads/0510f05f-52a1-4889-90cb-5ea06866e38822071A1211_Poster.pdf" >
    <Page pageNumber={pageNumber} />
  </Doc>
  <p>
    Page {pageNumber} of {numPages}
  </p>
    
    
</div></div>
  )
}

export default Documents


