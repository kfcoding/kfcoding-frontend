import React, {PureComponent} from 'react';
//import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Divider,
} from 'antd';
import styles from './CreateWorkspace.less';
import MyHeader from "./Header";
import MyFooter from "./Footer";
import {Layout} from "antd/lib/index";
import './Workspace.css';
import {createWorkSpace} from "../services/workspace";

const {Content} = Layout;
const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
const templateList = [
  {
    id: '1001',
    name: 'Python',
    logo: '/Python.png',
  },
  {
    id: '1002',
    name: 'C++',
    logo: '/C++.png',
  },
  {
    id: '1003',
    name: 'NodeJs',
    logo: '/NodeJs.png',
  },
  {
    id: '1004',
    name: 'HTML5',
    logo: '/HTML5.png',
  },
];

/*@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))*/
//@Form.create()

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 7},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
    md: {span: 10},
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: {span: 24, offset: 0},
    sm: {span: 10, offset: 7},
  },
};


const BasicForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      title: Form.createFormField({
        ...props.title,
        value: props.title.value,
      }),
      description: Form.createFormField({
        ...props.description,
        value: props.description.value,
      }),
      URL: Form.createFormField({
        ...props.URL,
        value: props.URL.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const {getFieldDecorator} = props.form;
  return (
    <Form>
      <FormItem {...formItemLayout} label="名称">
        {getFieldDecorator('title', {
          rules: [
            {
              required: true,
              message: '请输入项目名称',
            },
          ],
        })(<Input placeholder="给项目起个名字"/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="项目描述">
        {getFieldDecorator('description', {
          rules: [
            {
              required: true,
              message: '请输入项目描述',
            },
          ],
        })(
          <TextArea
            style={{minHeight: 32}}
            placeholder="请输入简短的项目描述"
            rows={4}
          />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="项目地址（可选）">
        {getFieldDecorator('URL')(<Input placeholder="git或码云地址"/>)}
      </FormItem>

    </Form>
  );
})

class CreateWorkspace extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      template: 'Python',
      fields: {
        title: {value: ''},
        description: {value: ''},
        URL: {value: ''},

      }
    };
  };
  handleButtonClick = (name) => {
    console.log(name);
    this.setState({
      template:name
    });

  }

  handleFormChange = (changedFields) => {
    this.setState(({fields}) => ({
      fields: {...fields, ...changedFields},
    }));
  }

  done = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let data = {
      title: this.state.fields.title.value,
      description: this.state.fields.description.value,
      environment: this.state.template,
      gitUrl: this.state.fields.URL.value,
      userId: user.id
    };
    createWorkSpace(data).then(res => {
      if (!res.err) {
        window.location.href = 'localhost:3000/?id=' + res.data.result.workspace.id;
      }
    })
  }

  render() {
    return (
      <Layout>
        <MyHeader/>
        <Content style={{padding: '0 50px'}}>
          <div style={{background: '#fff', padding: 24, margin: '30px 0', minHeight: 680}}>
            <Divider style={{fontSize: '28px'}}>创建Workspace</Divider>
            <div style={{width: 800, margin: '0 auto'}}>
              <Card bordered={false}>
                <BasicForm {...this.state.fields} onChange={this.handleFormChange}/>
                <FormItem {...formItemLayout} label="模板">
                  <div style={{width: '400px'}}>
                    {templateList.map(item => (
                      <div className={this.state.template === item.name ? 'cardInfo' : 'card'}>
                        <div className='cardItem' onClick={() => {
                          this.handleButtonClick(item.name)
                        }}>
                          <button className='cardButton' style={{backgroundImage: "url(" + item.logo + ")"}}/>
                          <h6 style={{textAlign: 'center', marginTop: '-20px'}}>{item.name}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </FormItem>
                <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                  <Button type="primary" htmlType="submit" onClick={this.done}>
                    提交
                  </Button>
                </FormItem>
              </Card>
            </div>
          </div>
        </Content>
        <MyFooter/>
      </Layout>
    );
  }
}

const createWorkspace = Form.create()(CreateWorkspace);
export default createWorkspace;