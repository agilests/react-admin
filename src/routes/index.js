/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import AllComponents from '../components';
import routesConfig from './config';
import queryString from 'query-string';

export default class CRouter extends Component {
    requireAuth = (role, component) => {
        const { user } = this.props;
        const { roles } = user.rule;
        // const { auth } = store.getState().httpData;
        // if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        if (!role) {
            return component;
        } else if (roles === `ROLE_${role}`) {
            return component;
        } else {
            return <Redirect to={'404'} />;
        }
    };
    requireLogin = (component, role) => {
        const { user } = this.props;
        // const { roles } = auth.role;
        // if (process.env.NODE_ENV === 'production' && user) { // 线上环境判断是否登录
        if (!user || Object.keys(user).length === 0) {
            return <Redirect to={'/login'} />;
        }
        return role ? this.requireAuth(role, component) : component;
    };
    render() {
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key =>
                        routesConfig[key].map(r => {
                            const route = r => {
                                const Component = AllComponents[r.component];
                                return (
                                    <Route
                                        key={r.route || r.key}
                                        exact
                                        path={r.route || r.key}
                                        render={props => {
                                            const reg = /\?\S*/g;
                                            // 匹配?及其以后字符串
                                            const queryParams = window.location.hash.match(reg);
                                            // 去除?的参数
                                            const { params } = props.match;
                                            Object.keys(params).forEach(key => {
                                                params[key] = params[key] && params[key].replace(reg, '');
                                            });
                                            props.match.params = { ...params };
                                            const merge = { ...props, query: queryParams ? queryString.parse(queryParams[0]) : {} };
                                            // 重新包装组件
                                            const wrappedComponent = (
                                                <DocumentTitle title={r.title}>
                                                    <Component {...merge} />
                                                </DocumentTitle>
                                            )
                                            return r.login
                                                ? wrappedComponent
                                                : this.requireLogin(wrappedComponent, r.role)
                                        }}
                                    />
                                )
                            }
                            return r.component ? route(r) : r.subs.map(r => route(r));
                        })
                    )
                }

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}