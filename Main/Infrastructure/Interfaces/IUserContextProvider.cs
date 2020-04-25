﻿using System;
using LinkCollectionApp.Models;

namespace LinkCollectionApp.Infrastructure.Interfaces
{
  public interface IUserContextProvider
  {
    [Obsolete("Some problems with this, use GetCurrentUserId instead")]
    public ApplicationUser GetCurrentUser();
    public string GetCurrentUserId();
  }
}
