import React from "react"

export class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    }
    constructor(props: any) {
        super(props)
    }

    static getDerivedStateFromError(error: any) {
        console.error(error)
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>
        }

        return this.props.children
    }
}
