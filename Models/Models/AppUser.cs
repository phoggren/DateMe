﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Models.Models
{
    public class AppUser : IdentityUser
    {

        public AppUser() : base()
        {
            
        }

        public bool Active { get; set; }

        public bool Visible { get; set; }
        [Required]
        public virtual UserData UserData { get; set; }
        [Required]
        public virtual Profile Profile { get; set; }
    }
}