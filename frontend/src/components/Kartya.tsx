import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactElement } from 'react';
import { Tablet } from '../tablet';

interface Props {
    tablet: Tablet;
    btn?: ReactElement
}

export function Kartya(props: Props) {
    const tablet = props.tablet

    return (
        <div className="card m-3" style={{ width: '18rem' }} key={tablet.id}>
            <div className="card-body">
                <h5 className="card-title">{tablet.manufacturer} {tablet.model}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Processor: {tablet.processor}</h6>
                <p className="card-text">
                    <strong>Clock Speed:</strong> {tablet.processor_clock_speed/1000} GHz<br />
                    <strong>Cores:</strong> {tablet.processor_cores}<br />
                    <strong>Storage:</strong> {tablet.storage} GB<br />
                    <strong>Screen Size:</strong> {tablet.screen_size}"<br />
                    <strong>Resolution:</strong> {tablet.screen_resolution}<br />
                    <strong>Price:</strong> {tablet.price} HUF
                    {
                        props.btn? <><br />{props.btn}</>: <span></span>
                    }
                </p>
            </div>
        </div>
    );
};