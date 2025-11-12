import './cards.css';

function BasicCard() {
  return (
    <Card
      className="basic-card"
      color="green"
      padding="sm"
      radius="md"
      shadow="sm"
      withBorder
    >
      <Card.Section></Card.Section>
      <Card.Section px="sm"></Card.Section>
      <Card.Section pb="sm" px="sm"></Card.Section>
    </Card>
  );
}

function CardWithRatings() {
  return <div>CardWithRatings</div>;
}

function BuyCards() {
  return <div>BuyCards</div>;
}

export { BasicCard, BuyCards, CardWithRatings };
