import React from 'react';
import styles from './Library.css';
import {message, Form, Input, Icon, Layout, Divider, Button, Menu} from 'antd';
import { Link } from 'react-router-dom';
import Book from "../components/Book";
import {currentUser, getMyKongfu, getToken} from "../services/users";
import { createKongfu } from "../services/kongfu";
import MyHeader from "./Header";
import MyFooter from "./Footer";
import {UpdateUser} from "../services/users"

const FormItem = Form.Item;
const { Content, Sider } = Layout;
const ButtonGroup = Button.Group;
const { SubMenu } = Menu;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

const BasicForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            account: Form.createFormField({
                ...props.account,
                value: props.account.value,
            }),
            name: Form.createFormField({
                ...props.name,
                value: props.name.value,
            }),
            email: Form.createFormField({
                ...props.email,
                value: props.email.value,
            }),
            city: Form.createFormField({
                ...props.city,
                value: props.city.value,
            }),
            company: Form.createFormField({
                ...props.company,
                value: props.company.value,
            }),
            profession: Form.createFormField({
                ...props.profession,
                value: props.profession.value,
            }),
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form>
            <FormItem
                label='账号'
                required
                {...formItemLayout}
            >
                {getFieldDecorator('account', {
                    rules: [{required: true, message: '账号不能为空'}],
                })(
                    <Input/>
                )}
            </FormItem>
            <FormItem
                label='昵称'
                required
                {...formItemLayout}
            >
                {getFieldDecorator('name', {
                    rules: [{required: true, message: '昵称不能为空'}],
                })(
                    <Input/>
                )}
            </FormItem>
            <FormItem
                label='邮箱'
                {...formItemLayout}
            >
                {getFieldDecorator('email', {
                    rules: [{type:'email' , message: '邮箱格式不正确'}],
                })(
                    <Input/>
                )}
            </FormItem>
            <FormItem
                label='城市'
                {...formItemLayout}
            >
                {getFieldDecorator('city', {
                    rules: [{max: 11 , message: '城市字数过多'}],
                })(
                    <Input/>
                )}
            </FormItem>
            <FormItem
                label='公司'
                {...formItemLayout}
            >
                {getFieldDecorator('company', {
                    rules: [{max: 255, message: '公司字数过多'}],
                })(
                    <Input/>
                )}
            </FormItem>
            <FormItem
                label='职位'
                {...formItemLayout}
            >
                {getFieldDecorator('profession', {
                    rules: [{max: 11, message: '职位字数过多'}],
                })(
                    <Input/>
                )}
            </FormItem>
        </Form>
    );
})

class UserSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                id:{value:''},
                name:{value:''},
                account:{value:''},
                avatar_url:{value: ''},
                email:{value: ''},
                city: {value: ''},
                company: {value: ''},
                profession: {value: ''}

            }
        };
    }

    handleFormChange = (changedFields) => {
        console.log("changeFileds:"+changedFields)
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    }

    componentDidMount() {
        currentUser().then(res => {
            this.setState({fields:{
                id : {value: res.data.result.user.id},
                name : {value: res.data.result.user.name},
                account : {value: res.data.result.user.account},
                email : {value: res.data.result.user.email},
                city : {value: res.data.result.user.city},
                company : {value: res.data.result.user.company},
                profession : {value: res.data.result.user.profession},
                }})
        })
    }

    done = () => {
        let data = {
            id: this.state.fields.id.value,
            name: this.state.fields.name.value,
            account: this.state.fields.account.value,
            email: this.state.fields.email.value,
            city: this.state.fields.city.value,
            company: this.state.fields.company.value,
            profession: this.state.fields.profession.value,
        };
        UpdateUser(data).then(res => {
            if (!res.err) {
                message.success('保存成功');
                this.setState({fields:{
                        id : {value: res.data.result.user.id},
                        name : {value: res.data.result.user.name},
                        account : {value: res.data.result.user.account},
                        email : {value: res.data.result.user.email},
                        city : {value: res.data.result.user.city},
                        company : {value: res.data.result.user.company},
                        profession : {value: res.data.result.user.profession}
                    }})
            }
        })
    }


    render() {
        let valid = true;
        const {visible, loading} = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout>
                <MyHeader/>
                <Content style={{ padding: '50px' }}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="wallet" />个人设置</span>}>
                                    <Menu.Item key="1">个人信息</Menu.Item>
                                    {/*<Menu.Item key="2">我收藏的秘籍</Menu.Item>*/}
                                </SubMenu>

                            </Menu>
                        </Sider>
                        <Content>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280, overflow: 'auto' }}>
                                <Divider orientation="left" style={{fontSize: '28px'}}>个人信息</Divider>
                                <BasicForm {...this.state.fields} onChange={this.handleFormChange}/>
                                <Form.Item {...formTailLayout}>
                                    <Button type="primary" onClick={this.done} disabled={!valid}><Icon type="check" />修改</Button>
                                </Form.Item>
                            </div>
                        </Content>
                    </Layout>
                </Content>
                <MyFooter/>
            </Layout>
        );
    }
}
const userSetter = Form.create()(UserSetting);
export default (userSetter);