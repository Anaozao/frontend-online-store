import { useNavigate } from 'react-router-dom'
import styles from './FinishWindow.module.css'
import React, { useState } from 'react'
import { CartPageProps } from '../../Types/Types'

function FinishWindow({LocalStorage}: CartPageProps) {

  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('Boleto')

  const [formInputs, setFormInputs] = useState({
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
    cep: '',
    adress: '',
    complement: '',
    adressNumber: '',
    city: '',
    state: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormInputs((prevState) => (
      {
        ...prevState,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value)
  }

  const handleFinish = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    LocalStorage.clearCart()
    navigate('/')
  }


  return (
    <section className={styles.finishSection}>
      <form className={styles.finishForm}>
        <h2 className={styles.formChildrens}>Informações do Comprador</h2>
        <div className={styles.formChildrens}>
          <label htmlFor="full-name-input"></label>
          <input
            onChange={handleChange}
            type="text"
            placeholder='Nome Completo'
            name='fullName'
            id='fill-name-input'
            value={formInputs.fullName}
          />

          <label htmlFor="cpf-input"></label>
          <input
            onChange={handleChange}
            type="text"
            id='cpf-input'
            name='cpf'
            placeholder='cpf'
            value={formInputs.cpf}
          />
        </div>

        <div className={styles.formChildrens}>
          <label htmlFor="email-input"></label>
          <input
            onChange={handleChange}
            type="text"
            id='email-input'
            name='email'
            placeholder='Email'
            value={formInputs.email}
          />

          <label htmlFor="phone-input"></label>
          <input
            onChange={handleChange}
            type="text"
            id='phone-input'
            name='phone'
            placeholder='Telefone'
            value={formInputs.phone}
          />
        </div>

        <div className={styles.formChildrens}>
          <label htmlFor="cep-input"></label>
          <input
            onChange={handleChange}
            type="text"
            id='cep-input'
            name='cep'
            placeholder='CEP'
            value={formInputs.cep}
          />

          <label htmlFor="adress-input"></label>
          <input
            onChange={handleChange}
            type="text"
            id='adress-input'
            name='adress'
            placeholder='Endereço'
            value={formInputs.adress}
          />
        </div>

        <div className={styles.formChildrens}>
          <label htmlFor="complement-input"></label>
          <input
          onChange={handleChange}
            type="text"
            name="complement"
            id="complement-input"
            placeholder='Complemento'
            value={formInputs.complement}
          />

          <label htmlFor="adress-number-input"></label>
          <input
            onChange={handleChange}
            type="text"
            id='adress-number-input'
            name='adressNumber'
            placeholder='Número'
            value={formInputs.adressNumber}
          />
        </div>

        <div className={styles.formChildrens}>
          <label htmlFor="city-input"></label>
          <input
            onChange={handleChange}
            type="text"
            id='city-input'
            name='city'
            placeholder='Cidade'
            value={formInputs.city}
          />

          <select onChange={handleChange} name="state">
            <option value="" disabled selected>Escolha um estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>
        <h2 className={styles.formChildrens}>Método de pagamento</h2>
      <div className={`${styles.formChildrens} ${styles.paymentMethods}`}>
          <div>
            <p>Boleto</p>
            <label htmlFor="bank-slip"></label>
            <input type="radio" value='Boleto' onChange={handleCheck} name='payment' id='bank-slip' checked={paymentMethod === 'Boleto'}/>
          </div>
          <div>
            <p>Cartão de crédito</p>
            <label htmlFor="visa"></label>
            <input type="radio" value='Cartão Visa' checked={
              paymentMethod === 'Cartão Visa'
            } onChange={handleCheck} name='payment' id='visa'/>

            <label htmlFor="master"></label>
            <input type="radio" value='Cartão MasterCard' checked={
              paymentMethod === 'Cartão MasterCard'
            } onChange={handleCheck} name='payment' id='master' />

            <label htmlFor="elo"></label>
            <input type="radio" value='Cartão Elo' onChange={handleCheck} checked={paymentMethod === 'Cartão Elo'} name='payment' id='elo'/>


          </div>
        </div>

      <button className={styles.formChildrens} type='submit' onClick={handleFinish}>Comprar</button>
      </form>
    </section>
  )
}

export default FinishWindow;