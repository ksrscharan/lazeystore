import './cards.css';

function BasicCard() {
  return (
    <Card
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      className="basic-card"
      color="green"
    >
      <Card.Section></Card.Section>
      <Card.Section px="sm"></Card.Section>
      <Card.Section px="sm" pb="sm"></Card.Section>
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
