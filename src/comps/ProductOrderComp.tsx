function ProductOrderComp({ order:any }) {
  const { date, cart } = order;
  const newDate = new Date(date);

  const totalPrice = cart.reduce((a, c) => {
    a += +c.price;
    return a;
  }, 0);

  const cartHash = cart.reduce((a, c) => {
    a[c.title] = (a[c.title] || 0) + 1;
    return a;
  }, {});

  const entries = Object.entries(cartHash);

  return (
    <div className="center">
      <p>
        You ordered on{" "}
        {`
          Month: ${newDate.getMonth()}, 
          Day: ${newDate.getDay()} 
        ${newDate.getFullYear()}`}{" "}
        with a Total price of: <b>${totalPrice}</b>
      </p>
      {entries &&
        entries.length > 0 &&
        entries.map((entry) => (
          <>
            <p key={crypto.randomUUID()}>
              {entry[1]} X {entry[0]}
            </p>
          </>
        ))}
    </div>
  );
}

export default ProductOrderComp;
