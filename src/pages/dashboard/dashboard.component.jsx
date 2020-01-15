import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPurchases, deletePurchases } from '../../actions/purchases.actions'
import { api } from "../../api"
import { PURCHASE_NEW_ROUTE } from "../../constants"
import { connect } from 'react-redux';


import './dashboard.scss';
import TableContainer from '../../components/table-container/table-container.component';
import TableHeader from '../../components/table-header/table-header.component';
import TableBody from '../../components/table-body/table-body.component';
import TableRow from '../../components/table-row/table-row.component';
import TableCell from '../../components/table-cell/table-cell.component';
import InputField from '../../components/input-field/input-field.component';
import CustomButton from '../../components/custom-button/custom-buttom.component';

const mapStateToProps = store => ({
  userData: store.authState.userData,
  purchases: store.purchasesState.purchases,
  isFetching: store.purchasesState.isFetching,
});

const mapDispatchToProps = dispatch => {
  return {
    getPurchases: (args) => dispatch(getPurchases(args)),
    deletePurchases: (args) => dispatch(deletePurchases(args)),
  }
}

function Dashboard ({
  userData,
  deletePurchases,
  getPurchases,
  isFetching,
  purchases,
}) {

  let history = useHistory()

  const [cashback, setCashback] = useState(0.00)
  const [seachFilter, setSeachFilter] = useState("");

  
  useEffect(() => {
    
    if(!userData.id)
      return
    else if (isFetching)
      return

    getPurchases(userData.id)   
    
    getCashback(userData.cpf)
    .then(res => setCashback(res.body.credit))
    .catch(err => console.error('err', err))

  }, [userData])

  const goToNew = () => {
    history.push(PURCHASE_NEW_ROUTE)
  }
  
  const getCashback = (cpf) => {
    return api.get(`/cashback?cpf=${cpf}`)
          .then(res => res.data)
  }

  const editPurchase = (e, purchase) => {
    e.stopPropagation();
    history.push(`/dashboard/${purchase.id}/editar`)
  }

  const deletePurchase = (e,purchase) => {
    e.stopPropagation();
    deletePurchases(purchase.id)
  }

  const showDetails = e => {
    console.log('object', e)    
  }

  const checkStatus = status => (
    (status || "").toLowerCase() === "em validação"
  )

  const handleSearch = (e) => {
    setSeachFilter(e.target.value)
  }

  const filterRule = (purchase) => (
    purchase.status.toLowerCase().includes(seachFilter) ||
    purchase.value.toString().includes(seachFilter) ||
    String(purchase.date).toLowerCase().includes(seachFilter)
  )

  return (
    <div className="Dashboard">  
      <div className="dash-container">
        <div className="widget">
          <div className="styled-title">
            <p>Saldo de Cashback</p>
            <i className="fas fa-piggy-bank"></i>
          </div>
          <h2>R$ {cashback}</h2>
        </div>              
        <div className="body-info">
          <div className="tb-widget">   
              <div className="title">
                <h2>Compras</h2>
              </div>     
              <div className="actions">               
                <div className="search">
                  <InputField
                    type="text"
                    label="Buscar"
                    value={seachFilter}
                    onChange={handleSearch}
                  />
                </div>
                <div className="new-item">
                  <CustomButton onClick={goToNew}>
                    Nova Compra
                  </CustomButton>
                </div>
              </div>
              <div className="tb-container">
              <TableContainer>
                <TableHeader 
                  columns={['Código', 'Valor', 'Data', '% cashback', 'valor do cashback', 'status', '']}
                />
                <TableBody>
                  {purchases.length
                    ? null
                    : (
                      <TableRow>
                        <TableCell colspan="7">Sem compras até agora</TableCell>
                      </TableRow>)}        
                  {purchases
                    .filter(filterRule)
                    .map((p, idx) => (
                      <TableRow 
                        key={`purchase_${idx}`}
                        onClickedRow={() => showDetails(p)}
                      >
                        <TableCell>{p.id}</TableCell>
                        <TableCell type="brl">{p.value}</TableCell>
                        <TableCell type="date">{p.date}</TableCell>
                        <TableCell type="percentage">{p.cashback_percentage}</TableCell>
                        <TableCell type="brl">{p.cashback}</TableCell>
                        <TableCell>{p.status}</TableCell>
                        <TableCell>
                          <div className="icon-action">
                            {!checkStatus(p.status)
                              ? null
                              : (
                                <>
                                  <i className="far fa-edit" onClick={e => editPurchase(e,p)}></i>
                                  <i className="far fa-trash-alt"onClick={e => deletePurchase(e,p)}></i>
                                </>
                              )}
                          </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)