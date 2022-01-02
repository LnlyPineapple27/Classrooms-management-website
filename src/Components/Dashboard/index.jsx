import { React } from 'react'
import Table from './TableDashboard'
import { Box } from '@mui/material'


var sampleData = [{
    "id":1, 
    "username": "teacher",
    "password": "teacher",
    "name": "Trinh Minh Dat",
    "createdDate": "2021-03-03",
    "email": "SuperIdol@spi.vn",
    "role": 1
}, {
    "id":2,
    "username": "student",
    "password": "student",
    "name": "To Dong Thanh",
    "createdDate": "2021-10-24",
    "email": "Cuutoivoi@cuu.toi.voi",
    "role": 2
}, {
    "id":3,
    "username": "admin",
    "password": "admin",
    "name": "Tran Phuoc Phat",
    "createdDate": "2021-03-12",
    "email": "TPP@abc.cc",
    "role": 0
}, {
    "id":4,
    "username": "cespino3",
    "password": "MFTIFbJP",
    "name": "Dau Buoi Tai Nhan",
    "createdDate": "2021-09-27",
    "email": "TaiNhanVippro@Vip.pro.vn",
    "role": 2
}, {
    "id":5,
    "username": "ejeandeau4",
    "password": "FcDrE7VMtU",
    "name": "Tieu Trinh Trinh",
    "createdDate": "2020-12-31",
    "email": "Onthidaihocvatly12@gmail.com",
    "role": 2
}, {
    "id":6,
    "username": "zkubik5",
    "password": "t4bRlmb",
    "name": "Meta Slave",
    "createdDate": "2021-02-05",
    "email": "GenshinGang@salve.meta.gang",
    "role": 2
}, {
    "id":7,
    "username": "gcrowne6",
    "password": "loOc5PpfB",
    "name": "Gachikoi Ni Nare",
    "createdDate": "2021-04-29",
    "email": "GachikoiGang@gang.sta.ww",
    "role": 2
}, {
    "id":8,
    "username": "fluna7",
    "password": "AnHHLoC",
    "name": "Moe Moe Kyun",
    "createdDate": "2021-01-06",
    "email": "MaidCafeInYourArea1@mcafe.com.jp",
    "role": 2
}, {
    "id":9,
    "username": "rnuzzetti8",
    "password": "0dwSUm0tACEG",
    "name": "Oishiku Nare",
    "createdDate": "2021-06-01",
    "email": "MaidCafeInYourArea2@mcafe.com.jp",
    "role": 2
}, {
    "id":10,
    "username": "fcheeseman9",
    "password": "VEnz8BmmYA",
    "name": "Haachama Chama",
    "createdDate": "2021-10-07",
    "email": "HaachaamaSekaiSaikoNoAidoru@gmail.com",
    "role": 2
}]

export default function Dashboard() {
    
    return (
        <Box>
            <Table tableHeader="Demo Header" data={sampleData} isCrud={false} isManager={true}/>
        </Box>
    )
}