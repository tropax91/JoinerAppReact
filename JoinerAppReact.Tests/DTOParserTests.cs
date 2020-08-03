using JoinerAppReact.DTOs;
using JoinerAppReact.Models;
using JoinerAppReact.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;
using Xunit.Sdk;

namespace JoinerAppReact.Tests
{
    public class DTOParserTests
    {
        [Theory]
        [MemberData(nameof(GetUserData))]
        public void ParseToDTO_User_ValidValues_ShouldWork(User user, UserDTO expected)
        {
            var actual = DTOParser.ParseToDTO(user);
            Assert.Equal(expected.Id, actual.Id);
            Assert.Equal(expected.Email, actual.Email);
            Assert.Equal(expected.FirstName, actual.FirstName);
            Assert.Equal(expected.LastName, actual.LastName);
            Assert.Equal(expected.Type, actual.Type);
        }

        [Theory]
        [MemberData(nameof(GetUserDTOData))]
        public void ParseFromDTO_User_ValidValues_ShouldWork(UserDTO user, User expected)
        {
            var actual = DTOParser.ParseFromDTO(user);
            Assert.Equal(expected.Id, actual.Id);
            Assert.Equal(expected.Email, actual.Email);
            Assert.Equal(expected.FirstName, actual.FirstName);
            Assert.Equal(expected.LastName, actual.LastName);
        }

        [Theory]
        [MemberData(nameof(GetOrderData))]
        public void ParseToDTO_Order_ValidValues_ShouldWork(Order order, OrderDTO expected)
        {
            var actual = DTOParser.ParseToDTO(order);
            Assert.Equal(expected.Id, actual.Id);
            Assert.Equal(expected.Price, actual.Price);
            Assert.Equal(expected.CreationDateTime, actual.CreationDateTime);
            Assert.Equal(expected.UserFullName, actual.UserFullName);
        }

        [Theory]
        [MemberData(nameof(GetOrderLineData))]
        public void ParseToDTO_OrderLines_ValidValues_ShouldWork(List<OrderLine> orderLines, List<OrderLineDTO> expected)
        {
            var actual = DTOParser.ParseToDTO(orderLines);
            
            Assert.Equal(expected.Count, actual.Count);
            
            for(int i = 0; i < expected.Count; i++)
            {
                Assert.Equal(expected[i].ShapeId, actual[i].ShapeId);
                Assert.Equal(expected[i].ShapeName, actual[i].ShapeName);
                Assert.Equal(expected[i].ShapeWidth, actual[i].ShapeWidth);
                Assert.Equal(expected[i].ShapeHeight, actual[i].ShapeHeight);
                Assert.Equal(expected[i].MaterialId, actual[i].MaterialId);
                Assert.Equal(expected[i].MaterialName, actual[i].MaterialName);
                Assert.Equal(expected[i].Quantity, actual[i].Quantity);
            }
        }

        public static IEnumerable<object[]> GetUserData()
        {
            var userIds = new List<Guid> { Guid.NewGuid(), Guid.NewGuid() };
            var allData = new List<object[]>
            {
                new object[]
                {
                    new User
                    {
                        Id = userIds[0], Email = "email1@company.com", FirstName = "John", LastName = "Doe",
                        UserAttribute = new List<UserAttribute>
                        {
                            new UserAttribute
                            {
                                Attribute = new Models.Attribute
                                {
                                    TypeId = Constants.AccountTypeId,
                                    AttributeName = "Customer"
                                }
                            }
                        }
                    },
                    new UserDTO { Id = userIds[0].ToString(), Email = "email1@company.com", FirstName = "John", LastName = "Doe", Type = "Customer" }
                },
                new object[]
                {
                    new User { Id = userIds[1], Email = "someone@company.com", FirstName = "Jane", LastName = "Doe" },
                    new UserDTO { Id = userIds[1].ToString(), Email = "someone@company.com", FirstName = "Jane", LastName = "Doe" }
                }
            };
            return allData;
        }

        public static IEnumerable<object[]> GetUserDTOData()
        {
            var userIds = new List<Guid> { Guid.NewGuid() };
            var allData = new List<object[]>
            {
                new object[]
                {
                    new UserDTO { Id = userIds[0].ToString(), Email = "email1@company.com", FirstName = "John", LastName = "Doe", Type = "Customer" },
                    new User { Id = userIds[0], Email = "email1@company.com", FirstName = "John", LastName = "Doe" }
                }
            };
            return allData;
        }

        public static IEnumerable<object[]> GetOrderData()
        {
            var orderIds = new List<Guid> { Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid() };
            DateTime creationDT = DateTime.Now;
            var allData = new List<object[]>
            {
                new object[]
                {
                    new Order
                    {
                        Id = orderIds[0], Price = 1234, CreationDateTime = creationDT, 
                        User = new User
                        {
                            FirstName = "John",
                            LastName = "Doe"
                        }
                    },
                    new OrderDTO { Id = orderIds[0].ToString(), Price = 1234, CreationDateTime = creationDT.ToString(), UserFullName = "John Doe" }
                }
            };
            return allData;
        }

        public static IEnumerable<object[]> GetOrderLineData()
        {
            var shapes = new List<Shape>
            {
                new Shape { Id = Guid.NewGuid(), Name = "shapeOne", Width = 800, Height = 550 },
                new Shape { Id = Guid.NewGuid(), Name = "shapeTwo", Width = 2000, Height = 300 }
            };

            var materials = new List<Material>
            {
                new Material { Id = Guid.NewGuid(), Name = "Oak" },
                new Material { Id = Guid.NewGuid(), Name = "Birch" }
            };

            var allData = new List<object[]>
            {
                new object[]
                {
                    new List<OrderLine>
                    {
                        new OrderLine { Shape = shapes[0], ShapeId = shapes[0].Id, Material = materials[0], MaterialId = materials[0].Id, Quantity = 3 },
                        new OrderLine { Shape = shapes[1], ShapeId = shapes[1].Id, Material = materials[1], MaterialId = materials[1].Id, Quantity = 8 }
                    },
                    new List<OrderLineDTO>
                    {
                        new OrderLineDTO { ShapeId = shapes[0].Id.ToString(), ShapeName = shapes[0].Name, ShapeWidth = shapes[0].Width.ToString(), ShapeHeight = shapes[0].Height.ToString(), MaterialId = materials[0].Id.ToString(), MaterialName = materials[0].Name, Quantity = 3 },
                        new OrderLineDTO { ShapeId = shapes[1].Id.ToString(), ShapeName = shapes[1].Name, ShapeWidth = shapes[1].Width.ToString(), ShapeHeight = shapes[1].Height.ToString(), MaterialId = materials[1].Id.ToString(), MaterialName = materials[1].Name, Quantity = 8 }
                    }
                }
            };
            return allData;
        }
    }
}
