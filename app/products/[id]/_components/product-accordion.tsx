import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";

interface ProductAccordionProps {
  product: {
    description: string;
    accompaniments: { id: string; label: string }[];
  };
}

export const ProductAccordion = ({ product }: ProductAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="desc">
        <AccordionTrigger>Descrição</AccordionTrigger>
        <AccordionContent className="text-balance">
          {product.description}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="acc">
        <AccordionTrigger>Acompanhamentos</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {product.accompaniments.map((a) => (
            <span key={a.id}>{a.label}</span>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
