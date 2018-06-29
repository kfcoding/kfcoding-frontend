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

const {Content} = Layout;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
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
class CreateWorkspace extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      template: '1001'
    };
  }

  handleButtonClick = (id) => {
    console.log(id);
    this.setState({
      template:id
    });

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    //let template = this.state.template;
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <Layout>
        <MyHeader/>
          <Content style={{padding: '0 50px'}}>
            <div style={{ background: '#fff', padding: 24, margin: '30px 0', minHeight: 680 }}>
              <Divider style={{fontSize: '28px'}}>创建Workspace</Divider>
                <div style={{width: 800, margin: '0 auto'}}>
                  <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                      <FormItem {...formItemLayout} label="名称">
                        {getFieldDecorator('name', {
                          rules: [
                            {
                              required: true,
                              message: '请输入项目名称',
                            },
                          ],
                        })(<Input placeholder="给项目起个名字" />)}
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
                            style={{ minHeight: 32 }}
                            placeholder="请输入简短的项目描述"
                            rows={4}
                          />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="项目地址（可选）">
                        {getFieldDecorator('URL')(<Input placeholder="git或码云地址" />)}
                      </FormItem>
                      <FormItem {...formItemLayout} label="模板">
                        <div style={{width:'400px'}}>
                          {templateList.map(item => (
                            <div className={this.state.template === item.id ? 'cardInfo' : 'card'}>
                              <div className='cardItem' onClick={() => {this.handleButtonClick(item.id)}}>
                                <button className='cardButton' style={{backgroundImage:"url("+item.logo+")"}}></button>
                                <h6 style={{textAlign:'center',marginTop:'-20px'}}>{item.name}</h6>
                              </div>
                            </div>
                            ))}
                        </div>
                      </FormItem>
                      <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button type="primary" htmlType="submit" loading={submitting}>
                          提交
                        </Button>
                      </FormItem>
                    </Form>
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