(function($) {
    'use strict';
    $(function() {
      var body = $('body');
      var contentWrapper = $('.content-wrapper');
      var scroller = $('.container-scroller');
      var footer = $('.footer');
      var sidebar = $('.sidebar');
  
  
      //Close other submenu in sidebar on opening any
  
      sidebar.on('show.bs.collapse', '.collapse', function() {
        sidebar.find('.collapse.show').collapse('hide');
      });
  
      $('select').select2();

      //Change sidebar and content-wrapper height
      applyStyles();
  
      function applyStyles() {
        //Applying perfect scrollbar
        if (!body.hasClass("rtl")) {
          if ($('.settings-panel .tab-content .tab-pane.scroll-wrapper').length) {
            const settingsPanelScroll = new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');
          }
          if ($('.chats').length) {
            const chatsScroll = new PerfectScrollbar('.chats');
          }
          if (body.hasClass("sidebar-fixed")) {
            if($('#sidebar').length) {
              var fixedSidebarScroll = new PerfectScrollbar('#sidebar .nav');
            }
          }
        }
      }
  
      $('[data-bs-toggle="minimize"]').on("click", function() {
        if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
          body.toggleClass('sidebar-hidden');
        } else {
          body.toggleClass('sidebar-icon-only');
        }
      });
  
      //checkbox and radios
      $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
  
      //Horizontal menu in mobile
      $('[data-toggle="horizontal-menu-toggle"]').on("click", function() {
        $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
      });
      // Horizontal menu navigation in mobile menu on click
      var navItemClicked = $('.horizontal-menu .page-navigation >.nav-item');
      navItemClicked.on("click", function(event) {
        if(window.matchMedia('(max-width: 991px)').matches) {
          if(!($(this).hasClass('show-submenu'))) {
            navItemClicked.removeClass('show-submenu');
          }
          $(this).toggleClass('show-submenu');
        }        
      })
  
    });
  
    // focus input when clicking on search icon
    $('#navbar-search-icon').click(function() {
      $("#navbar-search-input").focus();
    });

    $(function() {
        $(".nav-settings").on("click", function() {
          $("#right-sidebar").toggleClass("open");
        });
        $(".settings-close").on("click", function() {
          $("#right-sidebar,#theme-settings").removeClass("open");
        });
    
        $("#settings-trigger").on("click" , function(){
          $("#theme-settings").toggleClass("open");
        });
    
    
        //background constants
        var navbar_classes = "navbar-danger navbar-success navbar-warning navbar-dark navbar-light navbar-primary navbar-info navbar-pink";
        var sidebar_classes = "sidebar-light sidebar-dark";
        var $body = $("body");
    
        //sidebar backgrounds
        $("#sidebar-light-theme").on("click" , function(){
          $body.removeClass(sidebar_classes);
          $body.addClass("sidebar-light");
          $(".sidebar-bg-options").removeClass("selected");
          $(this).addClass("selected");
        });
        $("#sidebar-dark-theme").on("click" , function(){
          $body.removeClass(sidebar_classes);
          $body.addClass("sidebar-dark");
          $(".sidebar-bg-options").removeClass("selected");
          $(this).addClass("selected");
        });
    
    
        //Navbar Backgrounds
        $(".tiles.primary").on("click" , function(){
          $(".navbar").removeClass(navbar_classes);
          $(".navbar").addClass("navbar-primary");
          $(".tiles").removeClass("selected");
          $(this).addClass("selected");
        });
        $(".tiles.success").on("click" , function(){
          $(".navbar").removeClass(navbar_classes);
          $(".navbar").addClass("navbar-success");
          $(".tiles").removeClass("selected");
          $(this).addClass("selected");
        });
        $(".tiles.warning").on("click" , function(){
          $(".navbar").removeClass(navbar_classes);
          $(".navbar").addClass("navbar-warning");
          $(".tiles").removeClass("selected");
          $(this).addClass("selected");
        });
        $(".tiles.danger").on("click" , function(){
          $(".navbar").removeClass(navbar_classes);
          $(".navbar").addClass("navbar-danger");
          $(".tiles").removeClass("selected");
          $(this).addClass("selected");
        });
        $(".tiles.light").on("click" , function(){
          $(".navbar").removeClass(navbar_classes);
          $(".navbar").addClass("navbar-light");
          $(".tiles").removeClass("selected");
          $(this).addClass("selected");
        });
        $(".tiles.info").on("click" , function(){
          $(".navbar").removeClass(navbar_classes);
          $(".navbar").addClass("navbar-info");
          $(".tiles").removeClass("selected");
          $(this).addClass("selected");
        });
        $(".tiles.dark").on("click" , function(){
          $(".navbar").removeClass(navbar_classes);
          $(".navbar").addClass("navbar-dark");
          $(".tiles").removeClass("selected");
          $(this).addClass("selected");
        });
        $(".tiles.default").on("click" , function(){
          $(".navbar").removeClass(navbar_classes);
          $(".tiles").removeClass("selected");
          $(this).addClass("selected");
        });
      });


      $(function() {
        var todoListItem = $('.todo-list');
        var todoListInput = $('.todo-list-input');
        $('.todo-list-add-btn').on("click", function(event) {
          event.preventDefault();
    
          var item = $(this).prevAll('.todo-list-input').val();
    
          if (item) {
            todoListItem.append("<li><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox'/>" + item + "<i class='input-helper'></i></label></div><i class='remove ti-close'></i></li>");
            todoListInput.val("");
          }
    
        });
    
        todoListItem.on('change', '.checkbox', function() {
          if ($(this).attr('checked')) {
            $(this).removeAttr('checked');
          } else {
            $(this).attr('checked', 'checked');
          }
    
          $(this).closest("li").toggleClass('completed');
    
        });
    
        todoListItem.on('click', '.remove', function() {
          $(this).parent().remove();
        });
    
      });
    

    //Open submenu on hover in compact sidebar mode and horizontal menu mode
    $(document).on('mouseenter mouseleave', '.sidebar .nav-item', function(ev) {
      var body = $('body');
      var sidebarIconOnly = body.hasClass("sidebar-icon-only");
      var sidebarFixed = body.hasClass("sidebar-fixed");
      if (!('ontouchstart' in document.documentElement)) {
        if (sidebarIconOnly) {
          if (sidebarFixed) {
            if (ev.type === 'mouseenter') {
              body.removeClass('sidebar-icon-only');
            }
          } else {
            var $menuItem = $(this);
            if (ev.type === 'mouseenter') {
              $menuItem.addClass('hover-open')
            } else {
              $menuItem.removeClass('hover-open')
            }
          }
        }
      }
    });
    
  })(jQuery);
  window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('myForm');
    if (el) {
      el.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
      
        // Get input field values
        var nameInput = document.getElementById("nameInput");
        var phoneInput = document.getElementById("phoneInput");
        var emailInput = document.getElementById("emailInput");

        // Validate input fields
        var isValid = true;
        if (nameInput.value.trim() === "") {
          isValid = false;
          nameInput.classList.add("error");
        } else {
          nameInput.classList.remove("error");
        }
        if (phoneInput.value.trim() === "") {
          isValid = false;
          phoneInput.classList.add("error");
        } else {
          phoneInput.classList.remove("error");
        }
        if (emailInput.value.trim() === "") {
          isValid = false;
          emailInput.classList.add("error");
        } else {
          emailInput.classList.remove("error");
        }
        // Submit form if valid
        if (isValid) {
          // event.preventDefault(); // Prevent form submission
          // document.getElementById("successMessage").style.display = "block";
          // setTimeout(function() {
          //   document.getElementById('successMessage').classList.add('show');
          // }, 1000); // Delay in milliseconds
          this.submit();
          event.preventDefault(); // Prevent form submission
          window.location.href = "message.html";

        }
      });
    }
});
AOS.init();

function tooltip() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");

  // function removetooltip() {
  //   popup.classList.remove("show");
  // }
  // popup.addEventListener("mouseleave",removetooltip);
}