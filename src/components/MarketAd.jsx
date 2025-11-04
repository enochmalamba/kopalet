import Icon from "./Icon";
import "./MarketAd.css";
function MarketAd() {
  return (
    <div className="market-ad">
      <div className="market-ad-details">
        <h3>New Collection </h3>
        <p>KNQR hats, sweatshirts, and more </p>
        <div className="market-ad-link">
          Shop now<Icon>call_made</Icon>
        </div>
      </div>
      <div className="market-ad-img">
        <img
          src="https://scontent.fllw1-1.fna.fbcdn.net/v/t51.75761-15/503698986_18125803588451860_939487154453053822_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEkc5jzfHuRjZ5Jh0mgOXfHqj11NF24eluqPXU0Xbh6W-mpVM8LSiAeTWkIhCtxL1x88H0Kgcxwr8b-MlUioy6w&_nc_ohc=UiOkfDu_zPMQ7kNvwGqxrsC&_nc_oc=AdlYAOI7SaW9dTCctTlNnjb994v10hretJmdhd4tsHTmz2n8t-n8dINm5BuBuGUUOXY&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=jqsf91MoH_qEfdPeAClhZQ&oh=00_AfhPygxiGsSFBx2Dk1i_G2L_zBOBdGT4hV52CiVrE9ejDA&oe=690F9B71"
          width={"100%"}
        />
      </div>
    </div>
  );
}

export default MarketAd;
