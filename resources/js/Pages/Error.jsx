export default function Error({ auth, status }) {

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">

                        <div className="card">
                            <div className="card-header">Error</div>

                            <div className="card-body">
                                <div className="alert alert-danger" role="alert">
                                    {status}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}
