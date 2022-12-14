import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import { Box, Checkbox, Dialog } from '@mui/material';
import { useState, useEffect } from 'react';
import { newFood }from '../../services/foodService';
import InputLabel from '@mui/material/InputLabel';


function DialogNewProd(props) {

  const { open, setOpen, message } = props;
  const [rows, setRows] = useState([{ name:'', quantity:'', vd:''}]);
  const [error, setError] = useState('')
  const [newName, setName] = useState('')
  const [newManufacture, setManufacture] = useState('')
  const [newIngredients, setIngredients] = useState('')
  const [newIngredientsCheck, setIngredientsCheck] = useState([])


  useEffect(() => {
  }, [error, newName, newManufacture, newIngredients, newIngredientsCheck, rows ]);

  const addRow = (index) => {
    setRows([...rows, { name:'', quantity:'', vd:''}])
  }

  const changeFields = (index, event) => {
    const data = [...rows];
    data[index][event.target.name] = event.target.value;
    setRows(data);
  }

  const changeName = (data) => {
      setName(data.target.value);
  }

  const changeManufacture = (data) => {
    setManufacture(data.target.value);
  }

  const changeIngredients = (data) => {
    setIngredients(data.target.value);
  }

  const handleChangeIngredients = (data) => {
    if(data.target.checked){
      setIngredientsCheck([...newIngredientsCheck, data.target.value])
    }else {
      const index = newIngredientsCheck.indexOf(data.target.value);
      if (index > -1) {
        newIngredientsCheck.splice(index, 1);
      }
    }
  }

  const cleanError = () => {
    setError('');
  }

  const saveProduct = async ()=> {
    let ingredients = { data:newIngredients, check:newIngredientsCheck} 
    console.log("ingredientes", ingredients)
    console.log("new", newIngredients)
    console.log("chec", newIngredientsCheck)
    const product = { name:newName, manufacturer:newManufacture, ingredients:JSON.stringify(ingredients), infoNutritional:JSON.stringify(rows)}
    const saveFoodResp = await newFood(product);
    console.log('Response',saveFoodResp)
    if(saveFoodResp.success){
      message(saveFoodResp.message, true)
      closeDialog()
    } else {
      setError(saveFoodResp.message)
    }
  }

  const closeDialog = () =>{
    cleanError()
    setName('');
    setManufacture('');
    setIngredients('');
    setRows([
      { name:'', quantity:'', vd:''}
    ]);
    setOpen(false);
  }

  const columns = [
    { field: 'name', headerName: 'Nome', width: 200, editable: true },
    { field: 'quantidade', headerName: 'Quantidade', width: 90, editable: true },
    { field: 'vd', headerName: 'Vd%', width: 90, editable: true }
  ];
  
  return (
    <Dialog fullScreen open={open}>
      <DialogTitle>Novo Produto</DialogTitle>
      {error.length>0?(
        <DialogContentText onClick={()=>cleanError()} sx={{ color: '#E52928' ,alignSelf: 'center'}}>{error}</DialogContentText>
      ):(<></>)}
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          value={newName}
          fullWidth
          variant="filled"
          onChange={event=>(changeName(event))}
        />
        <TextField
          autoFocus
          margin="dense"
          id="manufacture"
          label="Fabricante"
          type="text"
          value={newManufacture}
          fullWidth
          variant="filled"
          onChange={event=>(changeManufacture(event))}
        />
        <InputLabel><h3>Este produto cont??m/pode conter:</h3></InputLabel>
        <InputLabel>Trigo, centeio, cevada, aveia e suas estirpes hibridizadas<Checkbox value=" Trigo, centeio, cevada, aveia e suas estirpes hibridizadas."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Crust??ceos<Checkbox value=" Crust??ceos."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Ovos<Checkbox value=" Ovos."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Peixes<Checkbox value=" Peixes."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Amendoim<Checkbox value=" Amendoim."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Soja<Checkbox value=" Soja."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Leites de todas as esp??cies de animais mam??feros ( Lactose )<Checkbox value=" Leites de todas as esp??cies de animais mam??feros ( Lactose )."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Am??ndoa ( Prunus dulcis, sin.: Prunus amygdalus, Amygdalus communis L.)<Checkbox value=" Am??ndoa ( Prunus dulcis, sin.: Prunus amygdalus, Amygdalus communis L.)."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Avel??s ( Corylus spp.)<Checkbox value=" Avel??s ( Corylus spp.)."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Castanha-de-caju ( Anacardium occidentale)<Checkbox value=" Castanha-de-caju ( Anacardium occidentale)."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Castanha-do-brasil ou castanha-do-par?? ( Bertholletia excelsa)<Checkbox value=" Castanha-do-brasil ou castanha-do-par?? ( Bertholletia excelsa)."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Macad??mias ( Macadamia spp.)<Checkbox value=" Macad??mias ( Macadamia spp.)."  onChange={handleChangeIngredients} color="success" lactose/></InputLabel>
        <InputLabel>Nozes ( Juglans spp.)<Checkbox value=" Nozes ( Juglans spp.)"  onChange={handleChangeIngredients} color="success"  /></InputLabel>
        <InputLabel>Pec??s ( Carya spp.)<Checkbox value=" Pec??s ( Carya spp.)"  onChange={handleChangeIngredients} color="success"  /></InputLabel>
        <InputLabel>Pistaches ( Pistacia spp.)<Checkbox value=" Pistaches ( Pistacia spp.)"  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <InputLabel>Pinoli ( Pinus spp.)<Checkbox value=" Pinoli ( Pinus spp.)."  onChange={handleChangeIngredients} color="success"  /></InputLabel>
        <InputLabel>Castanhas ( Castanea spp.)<Checkbox value=" Castanhas ( Castanea spp.)."  onChange={handleChangeIngredients} color="success"  /></InputLabel>
        <InputLabel>L??tex natural<Checkbox value=" L??tex natural."  onChange={handleChangeIngredients} color="success" /></InputLabel>
        <TextField
          autoFocus
          margin="dense"
          id="ingredients"
          label="Outros ingredientes"
          type="text"
          fullWidth
          variant="filled"
          value={newIngredients}
          onChange={event=>(changeIngredients(event))}
        />
        <Box sx={{ height: 400, width: '100%' }}>
          <table>
            <thead>
              <div style={{display:'flex' , width:'max-content', margin:'15px'}}>
                <h3>Informa????es Nutricionais</h3>
              </div>
              <tr>
                { columns.map((col)=>(
                  <th style={{ width:col.width}}>{col.headerName}</th>
                  )) }
                  <th>
                    <Button sx={{color: '#E52928'}} onClick={ ()=> addRow() }>Add +</Button>
                  </th>
              </tr>
            </thead>
            <tbody>
                { rows.map((row, index)=>(
                  <tr key={index}>
                    <td>
                      <TextField
                        autoFocus
                        name='name'
                        margin="dense"
                        value={row.name}
                        type="text"
                        variant="filled"
                        onChange={event=>(changeFields(index, event))}
                      />
                    </td>
                    <td>
                      <TextField
                        name='quantity'
                        autoFocus
                        margin="dense"
                        value={row.quantity}
                        type="text"
                        variant="filled"
                        onChange={event=>(changeFields(index, event))}

                      />
                    </td>
                    <td>
                      <TextField
                        autoFocus
                        name='vd'
                        margin="dense"
                        value={row.vd}
                        type="text"
                        variant="filled"
                        onChange={event=>(changeFields(index, event))}
                      />
                    </td>
                  </tr>
                  ))}
            </tbody>
          </table>
        </Box>
        <Button sx={{color: '#E52928'}} onClick={ ()=> addRow() }>Add +</Button>
      </DialogContent>
      <DialogActions>
        <Button sx={{color: '#E52928'}} onClick={()=>closeDialog()}>Cancelar</Button>
        <Button sx={{color: '#E52928'}} onClick={ ()=> saveProduct() }>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogNewProd 
