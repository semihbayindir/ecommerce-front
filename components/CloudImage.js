import { Helmet } from "react-helmet";

export default function CloudImage(title){
    return(
        <>
        <Helmet>
            <script src="https://scaleflex.cloudimg.io/v7/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js?func=proxy"></script>
            <script src="https://cdn.scaleflex.it/filerobot/js-cloudimage-responsive/yall.min.js?v3.1.1"></script>
        </Helmet>
        <div
            className="cloudimage-360"
            data-folder="https://rotameta-ecommerce.s3.eu-central-1.amazonaws.com/"
            data-filename-x={`${title}{index}.png`}
            data-amount-x="30"
            data-pointer-zoom="2"
            data-responsive="">
        </div>
        </>
    );
}