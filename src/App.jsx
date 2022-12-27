/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup
  .object({
    name: yup.string().required("O nome é obrigatório!"),
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("O email é obrigatório!"),
    gender: yup.string().required("Selecione uma opção!").nullable(),
    civilStatus: yup
      .string()
      .required("selecione uma opção!")
      .oneOf(["solteiro", "casado", "divorciado"]),
  })
  .required();

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <div className="App">
      <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
        <h1>progresso do formulário</h1>
        <div> {/* crie a barra de progresso aqui */}</div>
        <label htmlFor="name">Nome Completo</label>
        <input type="text" name="name" id="name" {...register("name")} />
        <span className="error-message"> {errors.name?.message}</span>

        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name="email"
          id="email"
          {...register("email", {
            pattern: {
              required: true,
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },
          })}
        />
        <span className="error-message">{errors.email?.message}</span>

        <label htmlFor="">Estado Civil</label>
        <select
          name="civilStatus"
          {...register("civilStatus", { required: true })}
        >
          <option value="">- selecione...</option>
          <option value="solteiro">Solteiro</option>
          <option value="casado">Casado</option>
          <option value="divorciado">Divorciado</option>
        </select>
        <span className="error-message">{errors.civilStatus?.message}</span>

        <label htmlFor="">Gênero</label>
        <div className="radios-container">
          <span>
            <input
              type="radio"
              name="gender"
              value="masculino"
              {...register("gender")}
            />
            Masculino
          </span>
          <span>
            <input
              type="radio"
              name="gender"
              value="feminino"
              {...register("gender")}
            />
            Feminino
          </span>
        </div>
        <span className="error-message"> {errors.gender?.message}</span>

        <button type="submit">Enviar Formulário</button>
      </form>
    </div>
  );
}

export default App;
