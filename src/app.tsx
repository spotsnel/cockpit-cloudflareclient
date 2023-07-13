import React from 'react';


type ApplicationProps = {
}

type ApplicationState = {
    connectionState? : string,
}

export class Application extends React.Component<ApplicationProps, ApplicationState> {
    state: ApplicationState = {
        connectionState: null
    }

    constructor(props: ApplicationProps) {
        super(props);

        cockpit
            .spawn(['warp-cli', 'status'])
            .done(content => {
                // just a test
                if(content.includes("Connecting")) {
                    this.setState(state => ({ connectionState: "Connecting" }));
                }
                if(content.includes("Connected")) {
                    this.setState(state => ({ connectionState: "Connected" }));
                }
                if(content.includes("Disconnected")) {
                    this.setState(state => ({ connectionState: "Disconnected" }));
                }
            })
            .fail(err => {

            });
    }

    render() {
        return (
            <>{
                this.state.connectionState != null
                    ? <p>{this.state.connectionState}</p>
                    : <p>Loading...</p>
                }
            </>
    )}
}
