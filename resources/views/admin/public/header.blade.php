<header class="main-header">
    <!-- Logo -->
    <a href="/" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>Ad</b>min</span>
        <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>投票系统</b>后台</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">

                <!--data-toggle="dropdown"-->
                <li class="dropdown user user-menu">
                    <a href="{{ url('/admin') }}" class="dropdown-toggle" >
                        <i class="fa fa-fw fa-user" style="color: #ffffff"></i>
                        <span class="hidden-xs">admin用户名</span>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- User image -->
                        <li class="user-header">
                            <img src="/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image"/>
                            <p>
                                Alexander Pierce - Web Developer
                                <small>Member since Nov. 2012</small>
                            </p>
                        </li>

                    </ul>
                </li>
                <li>
                    <a href="{{ url('/out') }}" class="dropdown-toggle" >
                        <span class="hidden-xs">退出</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</header>