import React, { Component } from "react";
import { getSession } from "next-auth/client";

// FIREBASE
import firebase from "config/firebase";

interface IState {
  isLoading: boolean;
}

interface IProps {
  user: {
    email: string;
    token: string;
  };
}

export const withAuthenticatedAdmin = (AuthComponent) => {
  return class Authenticated extends Component<IProps, IState> {
    static async getInitialProps(ctx) {
      const session = await getSession(ctx);

      if (!session || !session.user["isAdmin"]) {
        ctx.res.writeHead(302, {
          Location: "signin",
        });

        ctx.res.end();

        return {};
      }

      return { user: session.user };
    }

    constructor(props: IProps) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    componentDidMount() {
      if (this.props.user) {
        this.setState({ isLoading: false });
      }
    }

    render() {
      const { isLoading } = this.state;
      const { user } = this.props;

      if (isLoading) return null;

      return <AuthComponent user={user} />;
    }
  };
};
