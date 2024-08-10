<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckIpAddressMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowed_ips = [
            '109.80.147.80',
            '127.0.0.1',
        ];

        if (! in_array($request->ip(), $allowed_ips)) {
            return response()->json([
                'message' => 'Unauthorized',
                'IP' => $request->ip(),
            ], 403);
        }

        return $next($request);
    }
}
