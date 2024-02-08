import inflammation from "../../public/images/banner.jpg"
function HomePage() {
    return (
      <div className="main_container">
        <div className="banner">
          <h1>LeSang : votre performance, notre science</h1>
          <p className="content">Par Jos Désforges, Hugo Rabesona, Pierre Hernot et Victor Vattier</p>

        </div>
        <h3>Quo deserunt sunt aut tempore consequatur. </h3><p>Lorem ipsum dolor sit amet. Vel totam quibusdam id laborum adipisci ut minus maxime. Est ratione aliquam est veniam nostrum et repellat ipsam ut eius velit nam sint voluptas vel voluptatum eius. Est galisum omnis in nostrum obcaecati ad commodi voluptatem ab minus ipsum sed mollitia repellendus. </p><ol><li>Id quae officiis cum vitae dolor ut accusamus amet et optio sint. </li><li>Aut voluptatem doloremque qui rerum quia 33 nesciunt ducimus id recusandae aperiam. </li><li>Aut minima fugiat est optio velit! </li></ol><dl><dt><dfn>Est labore vitae ut veniam labore. </dfn></dt><dd>Sed consequatur laborum aut ipsum possimus eum eligendi voluptatum qui nostrum error. </dd><dt><dfn>Et dolorum dolore? </dfn></dt><dd>Aut voluptatibus voluptatem et pariatur amet sed commodi maxime. </dd></dl>

      </div>
    );
  }
  
  export default HomePage;
  
  const styles = {
    banner: {
      backgroundImage: inflammation,
      height: "300px",
      position: "relative",
      objectFit: "cover",
      borderRadius: "15px",                      
    }
  
}