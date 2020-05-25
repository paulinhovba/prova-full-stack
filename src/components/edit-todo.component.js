import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';
registerLocale('pt', pt)

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
        this.onChangeTodoCategory = this.onChangeTodoCategory.bind(this);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoDate = this.onChangeTodoDate.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_title: '',
            todo_category: '',
            todo_description: '',           
            todo_priority: '',
            todo_date: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_title: response.data.todo_title,
                    todo_category: response.data.todo_category,
                    todo_description: response.data.todo_description,
                    todo_date: response.data.todo_date,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTodoTitle(e) {
      this.setState({
          todo_title: e.target.value
      });
  }

    onChangeTodoCategory(e) {
      this.setState({
          todo_category: e.target.value
      });
    }

    onChangeTodoDescription(e) {
      this.setState({
          todo_description: e.target.value
      });
    }

    onChangeTodoDate(e) {
        this.setState({
            todo_date: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_title: this.state.todo_title,
            todo_category: this.state.todo_category,
            todo_description: this.state.todo_description,
            todo_date: this.state.todo_date,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    handleChange = date => {
      this.setState({
        startDate: date,
        todo_date: date.toString() 
      });      
    };

    render() {
        return (
            <div>
                <h4 align="center">Edição de Tarefas</h4>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group"> 
                        <label>Título: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_title}
                                onChange={this.onChangeTodoTitle}
                                />
                    </div>

                    <div className="form-group"> 
                        <label>Categoria: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_category}
                                onChange={this.onChangeTodoCategory}
                                />
                    </div>

                    <div className="form-group"> 
                        <label>Descrição: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>

                    <DatePicker 
                      className="form-group"
                      width="17em"
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      locale="pt" 
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="HORÁRIO"
                      dateFormat="'Dia' dd 'de' MMMM' - 'HH:mm'h'"  
                      placeholderText="Selecione uma data..."                            
                    />

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Baixa"
                                    checked={this.state.todo_priority==='Baixa'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Baixa</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Média" 
                                    checked={this.state.todo_priority==='Média'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Média</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="Alta" 
                                    checked={this.state.todo_priority==='Alta'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Alta</label>
                        </div>

                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Finalizado
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Atualizar" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}