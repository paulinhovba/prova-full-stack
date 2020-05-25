import React, { Component } from 'react';
import axios from 'axios';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';

registerLocale('pt', pt);

export default class CreateTodo extends Component {    

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
        this.onChangeTodoCategory = this.onChangeTodoCategory.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoDate = this.onChangeTodoDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_title: '',
            todo_description: '',
            todo_category: '',            
            todo_priority: '',
            todo_date: '',
            todo_completed: false,
            startDate: new Date()
        }
    }

    onChangeTodoTitle(e) {
      this.setState({
          todo_title: e.target.value
      });
  }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }    

    onChangeTodoCategory(e) {
      this.setState({
          todo_category: e.target.value
      });
  }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoDate(e) {
      this.setState({
          todo_date: e.target.value
      });
  }

    onSubmit(e) {
      e.preventDefault();
      
      console.log(`Form submitted:`);
      console.log(`Todo Title: ${this.state.todo_title}`);
      console.log(`Todo Category: ${this.state.todo_category}`);
      console.log(`Todo Description: ${this.state.todo_description}`);      
      console.log(`Todo Priority: ${this.state.todo_priority}`);
      console.log(`Todo Date: ${this.state.todo_date}`);
   
      const newTodo = {
          todo_title: this.state.todo_title,
          todo_category: this.state.todo_category,
          todo_description: this.state.todo_description,          
          todo_priority: this.state.todo_priority,
          todo_date: this.state.todo_date,
          todo_completed: this.state.todo_completed
      };

      axios.post('http://localhost:4000/todos/add', newTodo)
          .then(res => console.log(res.data));

      this.setState({          
          todo_title: '',
          todo_category: '',
          todo_description: '',          
          todo_priority: '',
          todo_date: '',
          todo_completed: false
      })      
    }

    handleChange = date => {
      this.setState({
        startDate: date,
        todo_date: date.toString()        
      });      
    };    

    render() {
        return (   

            <div style={{marginTop: 10}}>

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
                        <textarea 
                                className="form-control"
                                rows="6"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div><br/>                    

                    <DatePicker 
                      className="form-group"
                      width="100px"
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      locale="pt"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="horário"
                      dateFormat="'Dia' dd 'de' MMMM' > 'HH:mm'"  
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

                    <div className="form-group">
                        <input type="submit" value="Criar" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}