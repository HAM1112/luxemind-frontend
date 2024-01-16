import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'

import logo from '../../../assets/luxeminds.png'




function PDFCertificate(props) {
    const {course_name, student_name , } = props
    const styles = StyleSheet.create({
      body:{
        padding:20,
        // backgroundColor: '#ea3343'
      },
      images:{
        width : 250,
        height : 100,
      },
      headingCompletion:{
        color : '#e5c3a6',
        fontSize:28,
        fontWeight: 'bold',
        marginTop : 20,
    },
    allContent :{
        border : 2,
        padding:20,
        marginTop:10,
        textAlign:'center',
        height : '90%',
        textTransform : 'capitalize',
    },
    
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    clarify:{
        marginTop:20,
        padding:10,
        fontSize:16,
        color: '#2E4374',
    },
    name : {
        marginTop:20,
        fontSize: 30,
        color: '#4B527E',
        textDecoration : 'underline',
        padding : 10,
    },
    completed : {
        color: '#2E4374',
        marginTop:20,
        padding : 10,
    },
    course:{
        fontSize:28,
        color: '#2E4374',
        marginTop:20,
        padding : 10,
    },
      logo:{
        width : '100%',
        display : 'flex',
        justifyContent : 'center'
      }
    });
    const width = 1220
    const height = 790
  return (
    
    <Document>
        <Page style={styles.body} size={{width , height}}>

            
            <View style={styles.allContent}>
                <View style={styles.logo}>
                    <Image src={logo} style={styles.images}/> 
                </View>

                <Text style={styles.headingCompletion}>CERTIFICATE OF COMPLETION</Text>

                <Text style={styles.clarify}>THIS IS TO CLARIFY THAT </Text>

                <Text style={styles.name}>{student_name}</Text>

                <Text style={styles.completed}>HAS SUCCESSFULLY COMPLETED THE COURSE</Text>

                <Text style={styles.course}>{course_name}</Text>

            </View>
        </Page>
    </Document>
    
  )
}

export default PDFCertificate
