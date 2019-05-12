import React, { Component } from "react";
import { fetchVoices } from '../../redux/resource/resActions';
import { connect } from '../../connect'
import { Tabs } from "antd";
const TabPane = Tabs.TabPane;
class Resources extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Tabs>
                <TabPane tab="语音" key="voices">
                    voices
                </TabPane>
                <TabPane tab="广告" key="ads">
                    ads
                </TabPane>
            </Tabs>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Resources)