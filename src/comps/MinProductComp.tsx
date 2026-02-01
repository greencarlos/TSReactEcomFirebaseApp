function MinProductComp({ product, count }) {
  return (
    <>
      <h2>{product.title + " (" + count + ")"}</h2>

      <img
        src={product.image || "../assets/images-not-found.webp"}
        alt={product.title}
      />
      <p className="price">
        {Math.round(product.price) + ".95 "}
        <s>{Math.round(product.price * 1.3) + ".95"}</s>{" "}
      </p>
    </>
  );
}

export default MinProductComp;
