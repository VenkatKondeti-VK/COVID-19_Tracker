import React from 'react'
import {Card, CardContent, Typography} from "@mui/material" 
import './InfoBox.css'

function InfoBox({title, cases, total, isRed, active, ...props}) {
  return (
    <Card 
      onClick={props.onClick} 
      className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}
    >
      <CardContent>

        <Typography className="infoBox_title" color="textSecondary">
            {title}
        </Typography>

        <h2 className="infoBox_cases">{cases}</h2>

        <Typography className="infoxBox_total" color="textSecondary">
            {total}
        </Typography>
        
      </CardContent>
    </Card>
  )
}

export default InfoBox
