using JoinerAppReact.DTOs;
using JoinerAppReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JoinerAppReact.Utilities
{
    public class PriceCalculator
    {
        private const decimal MaterialCostPerM2 = 100M;
        private const decimal MaterialMinimumCost = 50M;
        private const decimal WorkCostPerM2 = 120M;
        private const decimal WorkMinimumCost = 100M;
        private const decimal MilliScaler = 1000000M;

        public static decimal CalculateOrderPrice(OrderDTO order, List<Shape> shapes)
        {
            decimal shapePrice;
            //int quantity;
            decimal totalPrice = 0;
            Shape shape;
            foreach (OrderLineDTO ol in order.OrderLines)
            {
                shape = shapes.First(s => s.Id == Guid.Parse(ol.ShapeId));
                shapePrice = CalculateShapePrice(shape.Width, shape.Height);
                //quantity = ol.Quantity;//data.OrderLines.First(ol => ol.ShapeId == shape.Id.ToString().ToUpper()).Quantity;
                totalPrice += (shapePrice * ol.Quantity);
            }
            return totalPrice;
        }

        public static decimal CalculateShapePrice(decimal width, decimal height)
        {
            decimal size = (width * height) / MilliScaler;

            decimal materialCost = size * MaterialCostPerM2;
            materialCost = materialCost > MaterialMinimumCost ? materialCost : MaterialMinimumCost;

            decimal workCost = size * WorkCostPerM2;
            workCost = workCost > WorkMinimumCost ? workCost : WorkMinimumCost;

            return materialCost + workCost;
        }
    }
}
