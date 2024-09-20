import React from 'react'

function Crausel() {
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide mt-2 mb-2 container-fluid" data-ride="carousel" style={{height:'10%'}}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="crausel/4.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="crausel/2.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="crausel/3.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </button>
            </div>
        </>
    )
}

export default Crausel
