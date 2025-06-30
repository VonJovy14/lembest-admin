import { Component } from "react";
import { connect } from "react-redux";
import { TwitchToken } from "../../modules/Twitch";

class Live extends Component {
  render() {
    const { activeNavigation } = this.props;
    if (activeNavigation === "LIVE") {
      return null; // Return nothing if the condition isn't met
    }

    return (
      <div className="twitch-floating-display-container">
        <TwitchToken />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeNavigation: state.navigation.activeNavigation.toUpperCase(),
  };
};

export default connect(mapStateToProps, null)(Live);
