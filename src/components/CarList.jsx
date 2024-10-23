import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';

import AddCar from './AddCar';
import EditCar from './EditCar';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CarList() {

    const [cars, setCars] = useState([]);

    const [open, setOpen] = useState(false);

    const [colDefs, setColDefs] = useState([
        { field: "brand", filter: true },
        { field: "model", filter: true, width: 150 },
        { field: "color", filter: true, width: 150 },
        { field: "fuel", filter: true, width: 120 },
        { headerName: "Year", field: "modelYear", filter: true, width: 150 },
        { field: "price", filter: true, width: 120 },
        { 
            cellRenderer: row => <EditCar updateCar={updateCar} car={row.data}/>
        },
        {
            cellRenderer: params => <Button size='small' color='error' onClick={() => handleDelete(params.data)}>Delete</Button>
        },
    ])

    //varmistaa, että auton tiedot haetaan API heti ja vain kerran, kun komponentti ladataan.
    //Ilman useEffect-hookia handleFetch-funktiota ei kutsuttaisi automaattisesti ja käyttäjän pitäisi esimerkiksi painaa jotain nappia tietojen hakemiseksi.
    useEffect(() => {
        handleFetch()
    }, []);

    const handleFetch = () => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            })
            .then(data => setCars(data._embedded.cars))
            .catch(error => console.error(error))

    }

    const handleDelete = (params) => {
        if (window.confirm("Are you sure?")) {
            setOpen(true);
            fetch(params._links.self.href, { method: "DELETE" })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error in delete: " + response.statusText);

                    return response.json();
                })
                .then(() => handleFetch())
                .catch(error => console.error(error))
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const saveCar = (car) => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => handleFetch())
        .catch(err => console.error(err))
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => handleFetch())
        .catch(err => console.error(err))
    }

    return (
        <>
            <div className='ag-theme-material' style={{ height: 500 }}>
            <AddCar saveCar={saveCar}/>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    // tiedot jaetaan useammalle sivulle
                    pagination={true}
                    //sivut jakaituvat automaattisesti ruudun koon mukaan
                    paginationAutoPageSize={true}
                />
                <Snackbar
                    open={open}
                    message="Car deleted"
                    autoHideDuration={3000}
                    onClose={handleClose}
                />
            </div>
        </>
    );
}

export default CarList;