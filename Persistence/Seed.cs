using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
          /*  if (!context.Activities.Any())
            {
                var activities = new List<Project>
                {
                    new Project
                    {
                        Title = "Past Project 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Project 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                    },
                    new Project
                    {
                        Title = "Past Project 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Project 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "Louvre",
                    },
                    new Project
                    {
                        Title = "Future Project 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Project 1 month in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                    },
                    new Project
                    {
                        Title = "Future Project 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Project 2 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "O2 Arena",
                    },
                    new Project
                    {
                        Title = "Future Project 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Project 3 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Another pub",
                    },
                    new Project
                    {
                        Title = "Future Project 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Project 4 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Yet another pub",
                    },
                    new Project
                    {
                        Title = "Future Project 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Project 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Just another pub",
                    },
                    new Project
                    {
                        Title = "Future Project 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Project 6 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "Roundhouse Camden",
                    },
                    new Project
                    {
                        Title = "Future Project 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Project 2 months ago",
                        Category = "travel",
                        City = "London",
                        Venue = "Somewhere on the Thames",
                    },
                    new Project
                    {
                        Title = "Future Project 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Project 8 months in future",
                        Category = "film",
                        City = "London",
                        Venue = "Cinema",
                    }
                };

                context.Activities.AddRange(activities);
                context.SaveChanges();
            } */
        }
    }
}