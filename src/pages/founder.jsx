import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";

function Founder() {
  return (
    <>
      <Header />
      <div className="home-mother">
        <div className="container" style={{ padding: "30px" }}>
          <h3 className="entry-title motherhouse">
            <a href="/founder">Founder</a>
          </h3>
          <div className="brudcrums">
            <Link to={"/"}>Home &nbsp;»&nbsp;{" "}</Link>
            <span className="pagename">Founder</span>
          </div>
        </div>
      </div>
      {/* Motherhouse content start */}
      <div className="container subpage">
        <h3 className="heading">Founder</h3>
        <div className="row">
          <div className="col-lg-9">
            <h3>FR.ADRIEN BREZY</h3>
            <table className="table ">
              <thead></thead>
              <tbody>
                <tr>
                  <th scope="row">Father</th>
                  <td>Augustine brezy</td>
                </tr>
                <tr>
                  <th scope="row">Mother</th>
                  <td>Louise Berthault</td>
                </tr>
                <tr>
                  <th scope="row">Birth</th>
                  <td>Born at Mons, Belgium on January 29, 1649</td>
                </tr>
                <tr>
                  <th scope="row">Baptism</th>
                  <td>St.Germaine ,Mons on January 31, 1649</td>
                </tr>
                <tr>
                  <th scope="row">God Father</th>
                  <td>Adrien leclerec</td>
                </tr>
                <tr>
                  <th scope="row">God Mother</th>
                  <td>Anna Deprez</td>
                </tr>
                <tr>
                  <th scope="row">Parish Priest of Wez</th>
                  <td>September 26, 1674</td>
                </tr>
                <tr>
                  <th scope="row">Died</th>
                  <td>June 1, 1699</td>
                </tr>
              </tbody>
            </table>
            <p>
              Fr.Adrien Brezy was a person who knew not only about God through
              his solid theological formation but also sought him in deep prayer
              and union with him, as is so well expressed in the epitaph on his
              tombstone.
            </p>
          </div>
          <div className="col-lg-3">
            <img src="/images/subpage/founder_fr_adrien.png" alt="" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <div className="mt-5">
              <h4>Patrimony of the Sisters of St.Charles Borromeo</h4>
              <p>
                <b>The EPITAPH</b>
                <br />
                "The Reverend Adrien Bresy, native of Mons, bachelor of the holy
                theology, promoted from the post of chaplain of Dottignies to
                that parish priest of Wez, became a model for his flock for
                twenty - five years and more. Zeal for souls, prayer and
                preaching were his preferred occupations. Nothing could resist
                his strength; everyone admired his meekness. His modest income
                did not prevent him from being a person in whom liberality and
                hospitality as well as the practice of Christian and pastoral
                virtues Appeared in all their perfection. Indefatigable as
                regards work, cherished and cherished and mourned by everyone,
                he died, to live eternally in heaven on the first day of June
                1699 and to satisfy his humility, was buried in front of his
                portal".
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <img src="/images/subpage/rip.png" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Founder;
