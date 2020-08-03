using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace JoinerAppReact.Models
{
    public partial class BachelorProjectContext : DbContext
    {
        public BachelorProjectContext()
        {
        }

        public BachelorProjectContext(DbContextOptions<BachelorProjectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<Attribute> Attribute { get; set; }
        public virtual DbSet<AttributeType> AttributeType { get; set; }
        public virtual DbSet<Material> Material { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderAttribute> OrderAttribute { get; set; }
        public virtual DbSet<OrderLine> OrderLine { get; set; }
        public virtual DbSet<Shape> Shape { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserAttribute> UserAttribute { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=lasercarpentry.database.windows.net;Database=BachelorProject;User Id=test; Password=SuperSecret!;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("address");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AddressLine1)
                    .IsRequired()
                    .HasColumnName("Address_Line1")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AddressLine2)
                    .HasColumnName("Address_Line2")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ClusterRowId).ValueGeneratedOnAdd();

                entity.Property(e => e.PostalCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Attribute>(entity =>
            {
                entity.ToTable("attribute");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AttributeName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.ClusterRowId).ValueGeneratedOnAdd();

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Attribute)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Attribute_AttributeType");
            });

            modelBuilder.Entity<AttributeType>(entity =>
            {
                entity.ToTable("attributeType");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ClusterRowId).ValueGeneratedOnAdd();

                entity.Property(e => e.TypeName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Material>(entity =>
            {
                entity.ToTable("material");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ClusterRowId).ValueGeneratedOnAdd();

                entity.Property(e => e.IsSelectable).HasColumnName("isSelectable");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Order")
                    .IsClustered(false);

                entity.ToTable("order");

                entity.HasIndex(e => e.ClusterRowId)
                    .HasName("IX_Order_ClusterRowId")
                    .IsClustered();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ClusterRowId).ValueGeneratedOnAdd();

                entity.Property(e => e.FkBillingAddress).HasColumnName("fk_billingAddress");

                entity.Property(e => e.Note).IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("smallmoney");

                entity.HasOne(d => d.FkBillingAddressNavigation)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.FkBillingAddress)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_order_address");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_order_user");
            });

            modelBuilder.Entity<OrderAttribute>(entity =>
            {
                entity.ToTable("orderAttribute");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Attribute)
                    .WithMany(p => p.OrderAttribute)
                    .HasForeignKey(d => d.AttributeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_orderAttribute_attribute");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderAttribute)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_orderAttribute_order");
            });

            modelBuilder.Entity<OrderLine>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_OrderLine")
                    .IsClustered(false);

                entity.ToTable("orderLine");

                entity.HasIndex(e => e.ClusterRowId)
                    .HasName("IX_OrderLine_ClusterRowId")
                    .IsClustered();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ClusterRowId).ValueGeneratedOnAdd();

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.OrderLine)
                    .HasForeignKey(d => d.MaterialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Material_OrderLine");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderLine)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_orderLine_order");

                entity.HasOne(d => d.Shape)
                    .WithMany(p => p.OrderLine)
                    .HasForeignKey(d => d.ShapeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_orderLine_shape");
            });

            modelBuilder.Entity<Shape>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Shape")
                    .IsClustered(false);

                entity.ToTable("shape");

                entity.HasIndex(e => e.ClusterRowId)
                    .HasName("IX_Shape_ClusterRowId")
                    .IsClustered();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ClusterRowId).ValueGeneratedOnAdd();

                entity.Property(e => e.Dxf)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Height).HasColumnName("height");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Width).HasColumnName("width");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Shape)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_shape_user");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_User")
                    .IsClustered(false);

                entity.ToTable("user");

                entity.HasIndex(e => e.ClusterRowId)
                    .HasName("IX_User_ClusterRowId")
                    .IsClustered();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ClusterRowId).ValueGeneratedOnAdd();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserAttribute>(entity =>
            {
                entity.ToTable("userAttribute");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Attribute)
                    .WithMany(p => p.UserAttribute)
                    .HasForeignKey(d => d.AttributeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_userAttribute_attribute");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserAttribute)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_userAttribute_user");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
