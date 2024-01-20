import "./css/About.css";
import coverImage from "../about-us.jpg";
import mosqueImage from "../Mosque.jpg";

export default function About() {
  return (
    <div className="About">
      <div className="AboutMosque">
        <h1 className="h1">Our Mosque</h1>
        <img className="MosqueImage" src={mosqueImage}></img>
      </div>

      {/* { <div>
        <h1 className="ImageText">About Us</h1>
        <img className="CoverImage" src={coverImage}></img>
      </div>} */}
      <div className="Container1">
        <h2 className="h2">Know More About Islam</h2>
        <p className="p2">
          Islam is one of the world's major monotheistic Abrahamic religions,
          along with Judaism and Christianity. It is based on the belief in one
          God (Allah in Arabic) and the teachings of the Prophet Muhammad, who
          is considered the final prophet in a long line of prophets including
          Adam, Abraham, Moses, and Jesus.<br></br>
          <br></br>
          Here are some key aspects of Islam:
          <br></br>
          <br></br>
          The Five Pillars of Islam: These are the fundamental acts of worship
          that every Muslim is expected to follow:
          <br></br>
          <br></br>
          Shahada (Faith): The declaration of faith, bearing witness that there
          is no god but Allah, and Muhammad is His messenger. <br></br>Salah
          (Prayer): Performing five daily prayers facing the Kaaba in Mecca.{" "}
          <br></br>Zakat (Charity): Giving to the poor and needy, usually a
          fixed percentage (usually 2.5%) of one's savings and investments.{" "}
          <br></br>Sawm (Fasting): Observing fasting during the month of
          Ramadan, abstaining from food, drink, and other physical needs during
          daylight hours. <br></br>Hajj (Pilgrimage): Making a pilgrimage to the
          holy city of Mecca, which is obligatory for every Muslim who is
          physically and financially able to do so. <br></br>The Qur'an: The
          holy book of Islam, believed by Muslims to be the literal word of God
          as revealed to the Prophet Muhammad over a period of approximately 23
          years.
          <br></br>
          Prophets: Muslims believe in many of the same prophets as Jews and
          Christians, including Adam, Noah, Abraham, Moses, and Jesus. However,
          they consider Muhammad to be the last and final prophet.
        </p>
      </div>
    </div>
  );
}
