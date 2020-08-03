using JoinerAppReact.DTOs;
using JoinerAppReact.Models;
using JoinerAppReact.Utilities;
using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using Xunit;

namespace JoinerAppReact.Tests
{
    public class PriceCalculatorTests
    {
        [Theory]
        [InlineData(1600, 1200, 422.4)]
        [InlineData(600, 1200, 172.0)] //less than minimum work cost
        [InlineData(600, 500, 150)] //less than minimum work & material cost
        [InlineData(0, 500, 150)] //boundary value
        public void CalculateShapePrice_ValidValues_ShouldWork(decimal width, decimal height, decimal expected)
        {
            decimal actual = PriceCalculator.CalculateShapePrice(width, height);

            Assert.Equal<decimal>(expected, actual);
        }

        [Theory]
        [MemberData(nameof(GetOrderData))]
        public void CalculateOrderPrice_ValidValues_ShouldWork(OrderDTO order, List<Shape> shapes, decimal expected)
        {
            decimal actual = PriceCalculator.CalculateOrderPrice(order, shapes);
            Assert.Equal(expected, actual);
        }

        public static IEnumerable<object[]> GetOrderData()
        {
            var shapeIds = new List<Guid> { Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid() };
            var allData = new List<object[]>
            {
                new object[]
                {
                    new OrderDTO
                    {
                        OrderLines = new List<OrderLineDTO>
                        {
                            new OrderLineDTO { ShapeId = shapeIds[0].ToString(), Quantity = 1 },
                            new OrderLineDTO { ShapeId = shapeIds[1].ToString(), Quantity = 3 },
                            new OrderLineDTO { ShapeId = shapeIds[2].ToString(), Quantity = 4 }
                        }
                    },
                    new List<Shape>
                    {
                        new Shape { Id = shapeIds[0], Width = 966, Height = 1366 },//price 290.30232
                        new Shape { Id = shapeIds[1], Width = 1500, Height = 800 },//264
                        new Shape { Id = shapeIds[2], Width = 1600, Height = 1200 }//422,4
                    },
                    (290.30232*1)+(264*3)+(422.4*4)
                },
                new object[]
                {
                    new OrderDTO
                    {
                        OrderLines = new List<OrderLineDTO>
                        {
                            new OrderLineDTO { ShapeId = shapeIds[0].ToString(), Quantity = 2 },
                            new OrderLineDTO { ShapeId = shapeIds[1].ToString(), Quantity = 5 }
                        }
                    },
                    new List<Shape>
                    {
                        new Shape { Id = shapeIds[0], Width = 400, Height = 400 },//price 150 (minimum)
                        new Shape { Id = shapeIds[1], Width = 500, Height = 200 }//price 150 (minimum)
                    },
                    (150*2)+(150*5)
                }
            };

            return allData;
        }
    }
}
