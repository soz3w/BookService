using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookService.Models
{
    public class Book
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public string Genre { get; set; }

        // Foreign Key
        public int AuthorId { get; set; }

        // Navigation property

       //set author virtual to enable lazy loading, but not a good performing method, many query is created, rather use dto and linq
        // to create join query, by using include
        public Author Author { get; set; }
    }
}