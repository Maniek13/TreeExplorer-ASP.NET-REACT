import React from 'react'
import Element from '../objects/element'
import styles from '../styles/tree.module.css'
import POST from '../../controllers/http/post'
import Responde from '../../controllers/http/objects/responde'

class AddForm extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        checked : false,
        error : false
      };
      Element.element.Type = this.state.checked ? "node" : "file";
    }

    type(evt){
      Element.element.Type = this.state.checked ? "file" : "node";
      this.setState({checked : !evt.target.value});
    }

    name(evt){
      Element.element.Name = evt.target.value;
    }

    async add(){
      await POST("https://localhost:5001/Elements/Add", Element.element);
      
      if(Responde.data === true){
        this.setState({error : false});
        this.props.callback();
      }
      this.setState({error : true});
     
    }

    exit(){
      this.props.callback();
    }

    render() {
        return (
            <div className={styles.add_form}>
              <button className={styles.exit} onClick={this.exit.bind(this)}>X</button>
              <div className={styles.el_form}>
                 <label defaultValue={this.props.name} className={styles.label}>Name:</label>
                <input id="name" type="text" onChange={this.name.bind(this)} className={styles.input}/>
              </div>
              <div className={styles.el_form}>
                <label className={styles.label}>Is folder?</label> 
                <input value={this.state.checked} type="checkbox" id="type"  defaultChecked={false} onChange={this.type.bind(this)} className={styles.input}/>
              </div>
              <div className={styles.btn_div}>
                <button className={styles.form_btn} onClick={this.add.bind(this)}>Add</button>
              </div>
              
              {this.state.error ? <div className={styles.error}><a>Plese enter name</a></div> : ""}
            </div>
        );
    }
}

export default AddForm;

