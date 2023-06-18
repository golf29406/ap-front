import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    TextField,
    Button,
    Container,
    FormControl,
    Grid,
    MenuItem,
    Select,
    InputLabel,
    Link
} from '@mui/material';
import Swal from 'sweetalert2'
const axios = require('axios');

const RegisterForm = () => {
    const [numberPayment, setNumberPayment] = useState('')
    const [moo, setMoo] = useState('')
    const [village, setVillage] = useState('')
    const [soi, setSoi] = useState('')
    const [road, setRoad] = useState('')
    const [province, setProvince] = useState('')
    const [provinceList, setProvinceList] = useState<any>([])
    const [district, setDistrict] = useState('')
    const [districtList, setDistrictList] = useState<any>([])
    const [subDistrict, setSubDistrict] = useState('')
    const [subDistrictList, setSubDistrictList] = useState<any>([])
    const [zipcode, setZipCode] = useState('')
    const [apiURL, setApiURL] = useState('http://localhost:3002')

    const fetchData = async () => {
        const apiUrlProvince = `${apiURL}/data/provinces`;
        const provinceListFromApi = await axios.get(apiUrlProvince);
        setProvinceList(provinceListFromApi.data);

    };
    useEffect(() => {
        fetchData();
    }, [])

    function handleSubmit(event: any) {
        event.preventDefault();
        let data = {
            numberPayment,
            moo,
            village,
            soi,
            road,
            province,
            district,
            subDistrict,
            zipcode
        }
        axios.post(`${apiURL}/payment`, data)
            .then((res: any) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => location.reload())
            })
            .catch((error: any) => {
                console.log('error log', error);
            })
    }
    async function handleChangeProvinceList(event: any) {
        event.preventDefault();
        if (event.target.value) {
            const apiUrlDistrict = `${apiURL}/data/districts?provinceCode=${event.target.value}`;
            const districtListFromApi = await axios.get(apiUrlDistrict);
            setDistrictList(districtListFromApi.data);
        }
    }
    async function handleChangeDistrictList(event: any) {
        event.preventDefault();
        if (event.target.value) {
            const apiUrlSubDistrict = `${apiURL}/data/subdistricts?districtCode=${event.target.value}`;
            const subDistrictListFromApi = await axios.get(apiUrlSubDistrict);
            setSubDistrictList(subDistrictListFromApi.data);
        }
    }
    async function handleChangeSubDistrictList(event: any) {
        event.preventDefault();
        if (event.target.value) {
            const apiUrlZipCode = `${apiURL}/data/geography?subdistrictCode=${event.target.value}`;
            const zipCodeListFromApi = await axios.get(apiUrlZipCode);
            setZipCode(zipCodeListFromApi.data[0].postalCode);
        }
    }

    function onreset() {
        setNumberPayment('');
        setMoo('');
        setVillage('');
        setSoi('');
        setRoad('');
        setProvince('');
        setDistrict('');
        setSubDistrict('');
        setZipCode('');
    }
    return (
        <React.Fragment>
            <Link
                href={`/payment`}
            >
                <Button variant="contained" color="info">
                    List Payments
                </Button>
            </Link>
            <Container>
                <h2 className="title-page">PAYMENT</h2>
                <p className="intro-page">Please fill more information.</p>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} className='container-grid'>
                        <Grid item xs={12} sm={6} md={5}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="เลขที่"
                                onChange={e => setNumberPayment(e.target.value)}
                                value={numberPayment}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="หมู่ที่"
                                onChange={e => setMoo(e.target.value)}
                                value={moo}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={5}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="หมู่บ้าน/อาคาร"
                                onChange={e => setVillage(e.target.value)}
                                value={village}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className='container-grid'>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="ซอย"
                                onChange={e => setSoi(e.target.value)}
                                value={soi}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="ถนน"
                                onChange={e => setRoad(e.target.value)}
                                value={road}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className='container-grid'>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">จังหวัด*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={province}
                                    label="จังหวัด"
                                    onChange={(e: any) => {
                                        setProvince(e.target.value),
                                            handleChangeProvinceList(e)
                                    }}
                                    required
                                >
                                    {provinceList.map((row: any, i: any) => (
                                        <MenuItem value={row.provinceCode} key={i}>{row.provinceNameTh}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">อำเภอ*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={district}
                                    label="อำเภอ/เขต"
                                    onChange={(e: any) => {
                                        setDistrict(e.target.value),
                                            handleChangeDistrictList(e)
                                    }}
                                    required
                                >
                                    {districtList.map((row: any, i: any) => (
                                        <MenuItem value={row.districtCode} key={i}>{row.districtNameTh}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className='container-grid'>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">ตำบล*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subDistrict}
                                    label="ตำบล/แขวง"
                                    onChange={(e: any) => {
                                        setSubDistrict(e.target.value),
                                            handleChangeSubDistrictList(e)
                                    }}
                                    required
                                >
                                    {subDistrictList.map((row: any, i: any) => (
                                        <MenuItem value={row.subdistrictCode} key={i}>{row.subdistrictNameTh}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="รหัสไปรษณีย์"
                                onChange={e => setZipCode(e.target.value)}
                                value={zipcode}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} className='button-grid'>
                        <Button variant="outlined" type="submit" className="btn-confirm"><CheckCircleIcon /> <span>CONFIRM</span></Button>
                        <Button variant="outlined" type="reset" onClick={onreset} className="btn-reset"><CancelIcon /> <span>CANCEL</span></Button>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    )
}

export default RegisterForm;