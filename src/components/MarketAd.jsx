import Icon from "./Icon";
import "./MarketAd.css";
function MarketAd() {
  return (
    <div className="market-ad">
      <div className="market-ad-details">
        <h3>Seemless 4G Internet</h3>
        <p>Get unlimited internet access </p>
        <div className="market-ad-link">
          Subscribe now<Icon>call_made</Icon>
        </div>
      </div>
      <div className="market-ad-img">
        <img
          src="https://static.wixstatic.com/media/35a0cd_0258717482e8494794a66615849776d1~mv2.jpg/v1/fill/w_1575,h_650,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/35a0cd_0258717482e8494794a66615849776d1~mv2.jpghttps://static.wixstatic.com/media/35a0cd_f2df275a8c9041ad9db2122dd4f9f9f6~mv2.jpg/v1/fill/w_1575,h_650,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/35a0cd_f2df275a8c9041ad9db2122dd4f9f9f6~mv2.jpg"
          width={"100%"}
        />
      </div>
    </div>
  );
}

export default MarketAd;
